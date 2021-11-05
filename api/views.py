from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics, status
from .serializers import ResultSerializer, CreateResultSerializer
from .models import Result
from rest_framework.views import APIView
from rest_framework.response import Response

# Create your views here.

#API 관련 코드가 들어갈 부분
def main(request):
    return HttpResponse("Hello")

class ResultView(generics.ListAPIView):
    queryset = Result.objects.all()
    serializer_class = ResultSerializer

class CreateResultView(generics.CreateAPIView):
    serializer_class = CreateResultSerializer

    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        serializer = self.serializer_class(data=request.data)
        
        keyword = serializer.data.keyword
        engine = serializer.data.engine
        context = serializer.data.context
        link_title = serializer.data.link_title
        abs_context = serializer.data.abs_context
        created_at = serializer.data.created_at
        URL = serializer.data.URL
        web_kind = serializer.data.web_kind
        pro_con = serializer.data.pro_con
        host = self.request.session.session_key
        queryset = Result.objects.filter(host=host)

        if queryset.exists():
            result = queryset[0]
            result.keyword = keyword
            result.engine = engine
            result.context = context
            result.link_title = link_title
            result.abs_context = abs_context
            result.created_at = created_at
            result.URL = URL
            result.web_kind = web_kind
            result.pro_con = pro_con
            result.save(update_fields=['keyword','engine','context','link_title','abs_context',
            'created_at','URL','web_kind','pro_con'])
        else:
            result = Result(host=host,keyword=keyword,engine=engine,context=context,link_title=link_title,
                abs_context=abs_context,created_at=created_at,URL=URL,web_kind=web_kind,pro_con=pro_con)
            result.save()
    

        return Response(ResultSerializer(result).data, status=status.HTTP_201_CREATED)    
