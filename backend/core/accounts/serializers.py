from rest_framework import serializers
from accounts.models import User

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','email', 'is_staff', 'phone', 'image', 'first_name', 'last_name', 'grouprole']


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'is_staff', 'password', 'phone', 'image', 'first_name', 'last_name', 'grouprole']
        extra_kwargs = {'password': {'write_only': True}}


class LectorSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'last_name', 'grouprole']