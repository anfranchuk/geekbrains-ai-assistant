from django.db.models.signals import post_save
from django.dispatch import receiver
from api import models, tasks

@receiver(post_save, sender=models.Lecture)
def notify(sender, instance, created, **kwargs):
    if created:
       tasks.process_event.delay(id = instance.id)