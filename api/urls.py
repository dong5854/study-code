from django.urls import path
from .views import main, ResultView, ResultCreate, GetResult

urlpatterns = [
    path('', main),
    path('view', ResultView.as_view()),
    path('create', ResultCreate.as_view()),
    path('get-result', GetResult.as_view()),
    #path('withhold', CreateResultView.as_view()),
]