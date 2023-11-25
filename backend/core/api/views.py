from django.shortcuts import render
from django_filters import rest_framework
from rest_framework import filters, viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from api import models
from api import serializers
from api import paginators

# Create your views here.
class LectureViewSet(viewsets.ModelViewSet):
    pagination_class = paginators.StandartPaginator
    lookup_field = 'id'
    filter_backends = (rest_framework.DjangoFilterBackend, filters.OrderingFilter, filters.SearchFilter)
    search_fields = ['id','name']
    ordering_fields = ['id','name','datetime']
    filterset_fields = {
        'name':['exact', 'contains'],
    }
    queryset = models.Lecture.objects.all()
    serializer_class = serializers.LectureSerializer
