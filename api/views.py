from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics

# Create your views here.

#API 관련 코드가 들어갈 부분
def main(request):
    return HttpResponse("Hello")