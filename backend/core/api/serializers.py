from rest_framework import serializers
from api import models
import datetime
from django.contrib.auth import get_user_model
User = get_user_model()

class LectureSerializer(serializers.ModelSerializer):
    id_psw = serializers.SlugRelatedField(queryset = User.objects.all(), slug_field='email')
    class Meta:
        model = models.Lecture
        fields = '__all__'