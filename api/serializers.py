from rest_framework import serializers
from .models import User, Crawled

class CrawlSerializer(serializers.ModelSerializer):
    class Meta:
        model = Crawled
        fields = ('id','keyword','engine','title','text','who','url','created_at','recommendation','hashtag')

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('user_id', 'user_pwd', 'user_name_first', 'user_name_last')

