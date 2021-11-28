from django.urls import path
from .views import main, ResultView, ResultCreate, GetResult, FindResult, ConnectCrawl, CreateUser, Login, Analysis

urlpatterns = [
    path('', main),
    path('view', ResultView.as_view()),
    path('create', ResultCreate.as_view()),
    path('get-result', GetResult.as_view()),
    path('find-result', FindResult.as_view()),
    path('connect_crawl', ConnectCrawl.as_view()),
    path('create_user', CreateUser.as_view()),
    path('login', Login.as_view()),
    path('analysis', Analysis.as_view()),
    #path('withhold', CreateResultView.as_view()),
]