from django.db import models
from django.conf import settings
User = settings.AUTH_USER_MODEL
# Create your models here.


class Lecture(models.Model):
    name = models.CharField(verbose_name='Название лекции', help_text='Название лекции', max_length=255, blank=False, null=False)
    lecturer = models.ForeignKey(User,verbose_name='Лектор', on_delete=models.CASCADE, help_text='Лектор', related_name='lectures', blank=True)
    summary = models.JSONField(verbose_name='Конспект', help_text='Конспект', default=list, blank=True, null=True)
    datetime = models.DateTimeField(verbose_name='Время лекции', help_text='Время лекции', auto_now_add=True, blank=True, null=True)
    glossary = models.JSONField(verbose_name='Глоссарий', help_text='Глоссарий', default=list, blank=True, null=True)
    audiofile = models.FileField(verbose_name='Аудио лекции', help_text='Аудио лекции', default=None, blank=True, null=True)
    video = models.FileField(verbose_name='Видео лекции', help_text='Видео лекции', default=None, blank=True, null=True)
    manual = models.FileField(verbose_name='Методичка', help_text='Методичка', default=None, blank=True, null=True)

    analyticSimilarity = models.FloatField(verbose_name='Соответствие', help_text='Процент cоответствия лекции методичке', default=None, blank=True, null=True)
    analyticLectureQuality = models.FloatField(verbose_name='Качество', help_text='Качество лекции', default=None, blank=True, null=True)
    analyticSilence = models.FloatField(verbose_name='Пустота', help_text='Отношение тишины ко времени лекции', default=None, blank=True, null=True)


    def __str__(self):
        return f'Лекция #{self.id}'

    class Meta:
        db_table = 'Lecture'
        verbose_name = 'Лекция'
        verbose_name_plural = 'Лекция'
        ordering = ['id']
