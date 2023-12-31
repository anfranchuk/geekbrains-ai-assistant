# Generated by Django 4.2.5 on 2023-11-25 08:18

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Lecture',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(help_text='Название лекции', max_length=255, verbose_name='Название лекции')),
                ('summary', models.JSONField(blank=True, default=list, help_text='Конспект', null=True, verbose_name='Конспект')),
                ('datetime', models.DateTimeField(auto_now_add=True, help_text='Время лекции', null=True, verbose_name='Время лекции')),
                ('glossary', models.JSONField(blank=True, default=list, help_text='Глоссарий', null=True, verbose_name='Глоссарий')),
                ('audiofile', models.FileField(blank=True, default=None, help_text='Аудио лекции', null=True, upload_to='', verbose_name='Аудио лекции')),
                ('video', models.FileField(blank=True, default=None, help_text='Видео лекции', null=True, upload_to='', verbose_name='Видео лекции')),
                ('manual', models.FileField(blank=True, default=None, help_text='Методичка', null=True, upload_to='', verbose_name='Методичка')),
                ('analyticSimilarity', models.FloatField(blank=True, default=None, help_text='Процент cоответствия лекции методичке', null=True, verbose_name='Соответствие')),
                ('analyticLectureQuality', models.FloatField(blank=True, default=None, help_text='Качество лекции', null=True, verbose_name='Качество')),
                ('analyticSilence', models.FloatField(blank=True, default=None, help_text='Отношение тишины ко времени лекции', null=True, verbose_name='Пустота')),
                ('lecturer', models.ForeignKey(blank=True, help_text='Лектор', on_delete=django.db.models.deletion.CASCADE, related_name='lectures', to=settings.AUTH_USER_MODEL, verbose_name='Лектор')),
            ],
            options={
                'verbose_name': 'Лекция',
                'verbose_name_plural': 'Лекция',
                'db_table': 'Lecture',
                'ordering': ['id'],
            },
        ),
    ]
