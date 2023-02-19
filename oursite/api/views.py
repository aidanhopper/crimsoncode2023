from django.shortcuts import render
from rest_framework import generics
from .models import Question
from .serializers import QuestionSerializer

# Create your views here.

class QuestionView(generics.CreateAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer