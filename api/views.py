from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics, status
from .serializers import ResultSerializer 
from .models import Result
from rest_framework.views import APIView
from rest_framework.response import Response

from api import serializers

# Create your views here.

#API 관련 코드가 들어갈 부분
def main(request):
    return HttpResponse("Hello")

class ResultView(generics.ListAPIView):
    queryset = Result.objects.all()
    serializer_class = ResultSerializer

class ResultCreate(generics.CreateAPIView):
    queryset = Result.objects.all()
    serializer_class = ResultSerializer

class GetResult(APIView):
    serializer_class = ResultSerializer
    lookup_url_kwargs = 'keyword'

    def get(self, request, format=None):
        #keyword = request.GET.get(self.lookup_url_kwargs)
        keyword = '아이폰'
        if keyword != None:
            result = Result.objects.filter(keyword=keyword)
            if len(result) > 0:
                for i in range(len(result)):
                    data = ResultSerializer(result[i]).data
                return Response(data, status=status.HTTP_200_OK)

            return Response({'Result Not Found'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'Bad Request'}, status=status.HTTP_400_BAD_REQUEST)


class FindResult(APIView):
    serializer_class = ResultSerializer

    def post(self, request, format=None):
        keyword = request.data["keyword"]
        
        if keyword != None:
            result = Result.objects.filter(keyword=keyword)
            if len(result) > 0:
                for i in range(len(result)):
                    data = ResultSerializer(result[i]).data
                return Response(data, status=status.HTTP_200_OK)

            return Response({'Result Not Found'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'Bad Request'}, status=status.HTTP_400_BAD_REQUEST)    
        
#class CreateResultView(APIView):
#     serializer_class = CreateResultSerializer

#     def post(self, request, format=None):
#         if not self.request.session.exists(self.request.session.session_key):
#             self.request.session.create()

#         serializer = self.serializer_class(data=request.data)
#         if serializer.is_valid():
#             keyword = serializer.data.get('keyword')
#             engine = serializer.data.get('engine')
#             context = serializer.data.get('context')
#             link_title = serializer.data.get('link_title')
#             abs_context = serializer.data.get('abs_context')
#             created_at = serializer.data.get('created_at')
#             URL = serializer.data.get('URL')
#             web_kind = serializer.data.get('web_kind')
#             pro_con = serializer.data.get('pro_con')
#             recommendation = serializer.data.get('recommendation')
#             host = self.request.session.session_key
#             queryset = Result.objects.filter(host=host)

#             if queryset.exists():
#                 result = queryset[0]
#                 result.keyword = keyword
#                 result.engine = engine
#                 result.context = context
#                 result.link_title = link_title
#                 result.abs_context = abs_context
#                 result.created_at = created_at
#                 result.URL = URL
#                 result.web_kind = web_kind
#                 result.pro_con = pro_con
#                 result.recommendation = recommendation
#                 result.save(update_fields=['keyword','engine','context','link_title','abs_context',
#                 'recommendation','created_at','URL','web_kind','pro_con'])
#             else:
#                 result = Result(host=host,keyword=keyword,engine=engine,context=context,link_title=link_title,
#                     abs_context=abs_context,created_at=created_at,URL=URL,web_kind=web_kind,pro_con=pro_con
#                     ,recommendation=recommendation)
#                 result.save()
#             return Response(ResultSerializer(result).data, status=status.HTTP_201_CREATED)   