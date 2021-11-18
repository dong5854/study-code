from rest_framework import serializers
from .models import Result, User, Record

class ResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = Result
        fields = ('id','keyword','engine','context','link_title','abs_context','recommendation'
        ,'created_at','URL','web_kind','pro_con')

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('User_id','User_pwd','User_name')

class RecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Record
        fields = ('Rec_id','Rec_keyword','Rec_engine','Rec_date','Rec_saved','Rec_kind')

# class CreateResultSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Result
#         fields = ('id','keyword','engine','context','link_title','abs_context','recommendation'
#         ,'created_at','URL','web_kind','pro_con')

