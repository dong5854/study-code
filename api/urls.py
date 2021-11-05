from django.urls import path
from .views import CreateResultView, main
from .views import ResultView

urlpatterns = [
    path('', main),
    path('view', ResultView.as_view()),
    path('create', CreateResultView.as_view()),
]
