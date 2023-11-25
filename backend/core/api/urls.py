from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from api import views


router = routers.DefaultRouter()
router.register(r'lectures', views.LectureViewSet)
urlpatterns = [
    path('v1/', include(router.urls)),
    #path('v1/get-dist/<int:id>/int:id>/', views.GetClients.as_view(), name='get-all-clients'),
]