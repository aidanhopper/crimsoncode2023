from django.shortcuts import render
from rest_framework import viewsets  
from .models import Question
from .serializers import QuestionSerializer

# Create your views here.

class QuestionView(viewsets.ModelViewSet):
    serializer_class = QuestionSerializer


    def get_queryset(self):
        """
        Optionally restricts the returned purchases to a given user,
        by filtering against a `username` query parameter in the URL.
        """
        queryset = Question.objects.all()
        requested_id = self.request.query_params.get('id')
        if requested_id is not None:
            queryset = queryset.filter(id=requested_id)
        return queryset