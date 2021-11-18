from django.db import models
import string
import random

# def generate_unique_code():
#     length = 6

#     while True:
#         code = ''.join(random.choices(string.ascii_letters, k = length))
#         if Result.objects.filter(id=id).count() == 0:

#             break
#     return code


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

class User(models.Model):
    User_id = models.CharField(max_length=30, primary_key = True)
    User_pwd = models.CharField(max_length=20)
    User_name = models.CharField(max_length=20)

class Record(models.Model):
    Rec_id = models.CharField(max_length=30, primary_key= True)
    Rec_keyword = models.CharField(max_length=20)
    Rec_engine = models.CharField(max_length=20)
    Rec_date = models.DateTimeField(auto_now_add=False)
    Rec_saved = models.BooleanField(null=False, default = 1)
    Rec_kind = models.CharField(max_length=20)

