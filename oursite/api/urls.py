from django.urls import path

from . import views

urlpatterns = [
    path('question/', views.QuestionView.as_view(), name='question'),
    path('player/', views.PlayerView.as_view(), name='player'),
    path('add_player/', views.add_record(), name='add_record'),
    path('plus_score', views.plus_score(), name='plus_score'),
]