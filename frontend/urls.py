from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('homepage', index),
    path('mainpage', index),
    path('result', index),
    path('analysis', index),
    path('signup', index),
    path('signin', index),
]
