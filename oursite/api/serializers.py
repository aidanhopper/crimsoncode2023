from rest_framework import serializers
from .models import Question, Player


class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ('id', 'question', 'option1', 'option2', 'option3', 'option4', 'correct_option')

class PlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = ('id', 'player_id', 'name', 'score')