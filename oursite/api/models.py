from django.db import models
from django.core.exceptions import ValidationError
import json
import random
import string

# Create your models here.
class Question(models.Model):

    class OptionChoices(models.IntegerChoices):
        OPTION1 = 0
        OPTION2 = 1
        OPTION3 = 2
        OPTION4 = 3

    question = models.CharField(max_length=500, blank = False)
    option1 = models.CharField(max_length=100, blank = False)
    option2 = models.CharField(max_length=100, blank = False)
    option3 = models.CharField(max_length=100, blank = False)
    option4 = models.CharField(max_length=100, blank = False)
    correct_option = models.IntegerField(choices = OptionChoices.choices)

    def __str__(self):
        return self.question
        
    def convert_to_json(self):
        index = 0

        for option in (self.option1, self.option2, self.option3, self.option4):
            if (self.correct_option == option):
                return json.dumps([self.question, [self.option1, self.option2, self.option3, self.option4], self.correct_option])
            index += 1

class Player(models.Model):
    player_id = models.CharField(max_length=10, blank= True)
    name = models.CharField(max_length=50, blank = False, default = "New Player")
    score = models.IntegerField(default=0)

    def clean(self):
        if self.score < 0: 
            raise ValidationError('Score cannot be less than 0!')
        
        self.player_id = "".join(random.sample(string.ascii_uppercase + string.digits, 9))

    def add_score(self):
        self.score += 1
        self.save()
