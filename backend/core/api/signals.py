from django.db.models.signals import post_save
from django.dispatch import receiver
from api import models

#@receiver(post_save, sender=models.Course)
#def notify(sender, instance, created, **kwargs):
#    if created:
        # Update list