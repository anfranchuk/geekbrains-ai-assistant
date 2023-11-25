# tasks.py
from celery import shared_task
from api import models as api_models


@shared_task
def process_event(id):
    print('GOT TASK')
    print('id', id)
    obj = api_models.Lecture.objects.get(id=id)
    print(obj.name)