from django.urls import path
from .views import main, ConnectCrawl, CreateUser, Login, Analysis, Procon

urlpatterns = [
    path('', main),
    path('connect_crawl', ConnectCrawl.as_view()),
    path('create_user', CreateUser.as_view()),
    path('login', Login.as_view()),
    path('analysis', Analysis.as_view()),
    path('procon', Procon.as_view()),
]