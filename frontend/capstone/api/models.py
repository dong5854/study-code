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
    created_at = models.DateTimeField(auto_now_add=False,null=True, blank=True) #date
    recommendation = models.IntegerField( default= 0, null=True, blank=True) #like
    hashtag = models.TextField(max_length=500, null=True, blank=True)
    words = models.TextField(max_length=2000, null=True, blank=True)

class User(models.Model):
    user_id = models.CharField(max_length=40, primary_key = True)
    user_pwd = models.CharField(max_length=40)
    user_name_first = models.CharField(max_length=30)
    user_name_last = models.CharField(max_length=30)


