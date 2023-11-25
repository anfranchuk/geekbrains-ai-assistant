from django.contrib import admin
from api import models 
# Register your models here.
@admin.register(models.Lecture)
class LogAdmin(admin.ModelAdmin):
    model = models.Lecture
    raw_id_fields = ['lecturer']
    list_display = ['id', 'lecturer', 'datetime', 'analyticSimilarity']
    list_display_links = ["id", "lecturer"]
    search_fields = ["name", "lecturer"]
    list_filter = ['datetime']
