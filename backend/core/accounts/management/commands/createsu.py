from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model

class Command(BaseCommand):
    def handle(self, *args, **options):
        User = get_user_model()
        if not User.objects.filter(email="admin@admin.com").exists():
            User.objects.create_superuser(email ="admin@admin.com",
                                            phone="79999999999",
                                            first_name = "Добрыня",
                                            last_name = "Никитич",
                                            password="admin",
                                            grouprole = 'Методист')