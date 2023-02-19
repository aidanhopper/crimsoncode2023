from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from rest_framework import viewsets  
from .models import Question, Player
from .serializers import QuestionSerializer, PlayerSerializer
import json

# Create your views here.

class QuestionView(viewsets.ModelViewSet):
    serializer_class = QuestionSerializer


    def get_queryset(self):
        queryset = Question.objects.all()
        requested_id = self.request.query_params.get('id')
        if requested_id is not None:
            queryset = queryset.filter(id=requested_id)
        return queryset


class PlayerView(viewsets.ModelViewSet):
    serializer_class = PlayerSerializer

    def get_queryset(self):

        queryset = Player.objects.all()
        requested_name = self.request.query_params.get('name')
        if requested_name is not None:
            queryset = queryset.filter(name=requested_name)
        return queryset

@csrf_exempt
def add_record(request):
    if request.method == "POST":
        data = json.loads(request.body)
        record = Player.objects.create(name=data["name"])
        return JsonResponse({"pid": record.player_id, "name": record.name})
    else:
        return JsonResponse({"error": "Invalid request method"})

@csrf_exempt
def plus_score(request):
    if request.method == "POST":
        data = json.loads(request.body)
        try:
            record = Player.objects.get(player_id = data["player_id"])
        except:
            return JsonResponse({"error": "Invalid player_id"})
        record.add_score()
        return JsonResponse({"pid": record.player_id, "name": record.name, "score": record.score})
    else:
        return JsonResponse({"error": "Invalid request method"})