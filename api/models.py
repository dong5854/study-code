from django.db import models
import string
import random

class Crawled(models.Model):
    keyword = models.CharField(max_length=20, null=True, blank=True)
    engine = models.CharField(max_length=20)
    title = models.TextField(max_length=200, null=True, blank=True) 
    text = models.TextField(max_length=5000, null=True, blank=True) #summary
    who = models.CharField(max_length=20, null=True, blank=True) #ID
    url = models.CharField(max_length=200, null=True, blank=True) #link
    created_at = models.TextField(null=True, blank=True) #date
    recommendation = models.IntegerField( default= 0, null=True, blank=True) #like
    hashtag = models.TextField(max_length=500, null=True, blank=True)
    words = models.TextField(max_length=2000, null=True, blank=True)

class User(models.Model):
    user_id = models.CharField(max_length=40, primary_key = True)
    user_pwd = models.CharField(max_length=40)
    user_name_first = models.CharField(max_length=30)
    user_name_last = models.CharField(max_length=30)
class Result(models.Model):
    keyword = models.CharField(max_length=20)
    engine = models.CharField(max_length=20)

    context = models.TextField(max_length=5000)
    link_title = models.CharField(max_length=100)
    abs_context = models.TextField()
    recommendation = models.IntegerField(null=True, default = 0)
    created_at = models.DateTimeField(auto_now_add=False)
    URL = models.CharField(max_length=50)
    web_kind = models.CharField(max_length=20)
    pro_con = models.BooleanField(null=False, default = 1)

class Record(models.Model):
    Rec_id = models.CharField(max_length=30, primary_key= True)
    Rec_keyword = models.CharField(max_length=20)
    Rec_engine = models.CharField(max_length=20)
    Rec_date = models.DateTimeField(auto_now_add=False)
    Rec_saved = models.BooleanField(null=False, default = 1)
    Rec_kind = models.CharField(max_length=20)

