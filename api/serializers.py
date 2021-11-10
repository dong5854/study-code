from rest_framework import serializers
from .models import Result

class ResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = Result
        fields = ('id','keyword','engine','context','link_title','abs_context','recommendation'
        ,'created_at','URL','web_kind','pro_con')

# class CreateResultSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Result
#         fields = ('id','keyword','engine','context','link_title','abs_context','recommendation'
#         ,'created_at','URL','web_kind','pro_con')