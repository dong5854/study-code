from rest_framework import serializers
from .models import Result, User, Record, Crawled

class CrawlSerializer(serializers.ModelSerializer):
    class Meta:
        model = Crawled
        fields = ('id','keyword','engine','title','text','who','url','created_at','recommendation','hashtag')


class ResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = Result
        fields = ('id','keyword','engine','context','link_title','abs_context','recommendation'
        ,'created_at','URL','web_kind','pro_con')

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('user_id', 'user_pwd', 'user_name_first', 'user_name_last')

class RecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Record
        fields = ('Rec_id','Rec_keyword','Rec_engine','Rec_date','Rec_saved','Rec_kind')

