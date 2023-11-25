from accounts.models import User
from accounts import serializers as accounts_serializers
from django.contrib.auth import authenticate, login
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated, AllowAny
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi


class UserRegistrationView(APIView):
    permission_classes = [AllowAny]
    serializer_class = accounts_serializers.UserSerializer
    @swagger_auto_schema(
                        request_body=accounts_serializers.UserSerializer,
                         responses={201: accounts_serializers.UserSerializer(many=False)})
    def post(self, request, *args, **kwargs):
        user = request.user
        if user.is_superuser or user.is_staff:
            ...
        else:
            return Response({"detail": "Permission denied"}, status=status.HTTP_403_FORBIDDEN)
        serializer = accounts_serializers.UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserLoginView(ObtainAuthToken):
    permission_classes = [AllowAny]
    @swagger_auto_schema(method='post')
    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(request, email=email, password=password)
        if user is not None:
            login(request, user)
            token, created = Token.objects.get_or_create(user=user)
            if created:
                token.delete()  # Delete the token if it was already created
                token = Token.objects.create(user=user)
            response = Response({
                'token': token.key,
                'grouprole': user.grouprole
                })
            return response
        else:
            return Response({'message': 'Invalid email or password'}, status=status.HTTP_401_UNAUTHORIZED)

class UserLogoutView(APIView):
    permission_classes = [AllowAny]
    @swagger_auto_schema(method='post')
    def post(self, request, *args, **kwargs):
        token_key = request.auth.key
        token = Token.objects.get(key=token_key)
        token.delete()
        return Response({'detail': 'Successfully logged out.'})


class UserProfileView(APIView):
    permission_classes = [AllowAny]
    @swagger_auto_schema(responses={201: accounts_serializers.UserProfileSerializer(many=False)})
    def get(self, request, *args, **kwargs):
        user = request.user        
        user_serializer = accounts_serializers.UserProfileSerializer(user, many=False, context={"request": request})
        return Response(user_serializer.data, status=status.HTTP_200_OK)
    

    
class LectorListView(APIView):
    permission_classes = [AllowAny]
    @swagger_auto_schema(responses={201: accounts_serializers.UserProfileSerializer(many=True)})
    def get(self, request, *args, **kwargs):
        users = User.objects.filter(grouprole="Лектор").values_list('email', flat=True)
        return Response(users, status=status.HTTP_200_OK)
    

    