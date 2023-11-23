# geekbrains-ai-assistant

#Speech Recognition #Content Generation #Educational Technology #ML

| Организатор  | Кейсодержатель |
| ------------- | ------------- |
| <img width="600" height="300" alt="image" src="https://github.com/anfranchuk/geekbrains-ai-assistant/blob/main/staticfiles/cplogo.jpg">  | <img width="600" height="300" alt="image" src="https://github.com/anfranchuk/geekbrains-ai-assistant/blob/main/staticfiles/gblogo.png">  |

# Интеллектуальный ассистент методиста

## Оглавление
0. [Проблематика 🤔](#problem)
1. [Задание 📝](#zadanie)
2. [Структура проекта 🏗️](#structure)
3. [Описание решения 💡](#solution)
4. [Запуск 🚀](#startup)
5. [Стек 🛠️](#stack)
6. [Соответствие критериям 🛠️](#stack)
7. [Команда 👥](#team)
8. [Ссылки 🔗](#urls)

## <a name="problem"> Проблематика 🤔</a>
### Проблематика от организаторов
В современном образовательном процессе качество подготовленных материалов — ключевойфактор успешного обучения. Методисты и преподаватели тратят значительное количествовремени на анализ и совершенствование своих лекционных материалов. Факты, свидетельствующие о значимости указанной проблематики:    
* Нередко конспекты лекций могут быть написаны некачественно, что затрудняет процесс обучения
* студентов.    
* Транскрибация и анализ аудио лекций — трудоемкий процесс, который существенно облегчился бы с применением ИИ.    
* Есть топ спикеры у которых в силу служебных обязанностей и плотного графика нет времени для оформления конспекта, программный сервис мог бы автоматически создавать конспект.    

### Проблемы, которые также решает наш проект:    
* Отсутствие стандартизации: Каждый преподаватель может иметь свой собственный стиль и формат представления материалов. Это может привести к несоответствию и неоднородности в предоставлении информации студентам.
* Ограниченный доступ к материалам: В некоторых случаях материалы могут быть доступны только во время лекций или в ограниченном объеме. Это может затруднить повторение материалов или использование их для дальнейшего изучения.
* Неэффективное использование мультимедиа: Полезные материалы, такие как презентации, видеоуроки или интерактивные задания, могут быть недостаточно использованы или неоптимально организованы. Это может снижать понимание и интерес студентов.
* Ограниченные возможности самостоятельного изучения: Некоторые студенты предпочитают изучать материалы самостоятельно в своем собственном темпе. Однако, если материалы не предоставлены в подходящем формате или неструктурированы, это может затруднить самостоятельное обучение.
* Ограниченная обратная связь и взаимодействие: Возможность задавать вопросы, получать обратную связь и взаимодействовать с преподавателем или другими студентами является важной частью образовательного процесса. Однако, в некоторых случаях эта возможность может быть ограничена или неэффективна.

## <a name="zadanie"> Задание 📝</a>

Мы разработали Интеллектуального ассистента методиста, который использует современные алгоритмы ИИ для анализа и улучшения качества образовательных материалов.

Наш сервис использует технологии распознавания речи для транскрибации аудиозаписей лекций в текстовый формат. Это значит, что методисты и преподаватели могут сосредоточить свое внимание на усовершенствовании своих материалов, а не на трудоемком процессе транскрибации.

Более того, наш сервис автоматически выделяет и записывает сложные термины и концепции, встречающиеся в лекциях, в глоссарий. Это облегчает процесс обучения студентов, поскольку они получают уже готовый конспект с описанием сложных тем.

Таким образом, наш интеллектуальный ассистент не только упрощает процесс подготовки материалов для лекций, но и делает эти материалы более доступными для студентов.

Процесс быстрого контента:
1. Проводим вебинар в живую
2. Из видео берем аудио
3. Делаем транскрипцию аудио
4. Создаем конспект лекции
5. Оформляем семинар

## <a name="structure">Структура проекта 🏗️</a>

```
myproject/              # Корневая директория проекта
├── myproject/          # Директория с настройками Django проекта
│   ├── settings.py     # Файл настроек Django, где настраивается подключение к PostgreSQL и Redis
│   ├── urls.py         # Файл с маршрутами приложения
│   └── wsgi.py         # Файл для настройки сервера приложения WSGI
│
├── api/                # Директория с кодом приложения
│   ├── models.py       # Файл с моделями данных  приложения
│   ├── views.py        # Файл с видами  приложения
│   └── ...
│
├── manage.py           # Файл для управления Django проектом
├── Dockerfile          # Файл, в котором описано создание Docker образа для Django приложения
├── docker-compose.yml  # Файл, в котором описаны все сервисы (Django, PostgreSQL, Redis, Nginx)
└── nginx/              # Директория с файлами конфигурации Nginx
    └── nginx.conf      # Файл конфигурации Nginx
```

## <a name="solution">Решение 💡</a>
Мы разработали Интеллектуального ассистента методиста, который использует современные алгоритмы ИИ для анализа и улучшения качества образовательных материалов.

Наш сервис использует технологии распознавания речи для транскрибации аудиозаписей лекций в текстовый формат. Это значит, что методисты и преподаватели могут сосредоточить свое внимание на усовершенствовании своих материалов, а не на трудоемком процессе транскрибации.

Более того, наш сервис автоматически выделяет и записывает сложные термины и концепции, встречающиеся в лекциях, в глоссарий. Это облегчает процесс обучения студентов, поскольку они получают уже готовый конспект с описанием сложных тем.

Таким образом, наш интеллектуальный ассистент не только упрощает процесс подготовки материалов для лекций, но и делает эти материалы более доступными для студентов.

### Функциональная модель решения 1
<img width="100" height="50" alt="func_scheme" src="https://github.com/anfranchuk/geekbrains-ai-assistant/blob/main/staticfiles/cplogo.jpg"> 

<p>Пример обработки </p>

| Номер этапа  | Описание  | Выходные данные | Выходные данные |
| ------------- | ------------- | ------------- | ------------- |
| 1.1 | Получение звука из видео | [![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/tPhx4kUM8Vg/0.jpg)](https://www.youtube.com/watch?v=tPhx4kUM8Vg)  | <audio ref='themeSong' src="https://github.com/anfranchuk/geekbrains-ai-assistant/blob/main/staticfiles/test_data.mp3" autoPlay loop></audio> |
| 1.2 | Получение сущностей из видео | <audio.mp3>  | Всем привет! С Вами geekbrains - гиганты в мире обучения! |
| 2 | Перевод видео в текст | [![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/tPhx4kUM8Vg/0.jpg)](https://www.youtube.com/watch?v=tPhx4kUM8Vg)  | Всем привет! С Вами geekbrains - гиганты в мире обучения! |



## <a name="startup">Запуск 🚀</a>

### Последовательные шаги для запуска кода:
1. Склонируйте гит репозиторий;    
```Bash
https://github.com/anfranchuk/geekbrains-ai-assistant.git
```

## <a name="stack">Стек 🛠️</a>
  <img src="https://github.com/devicons/devicon/blob/master/icons/python/python-original-wordmark.svg" title="Python" alt="Python" width="40" height="40"/>&nbsp;

## <a name="team">Команда 👥</a>

*Состав команды "RGB"*    
*Николай Бабухин    
*Артем Франчук    
*Виктория Митяева    
*София Филина    
*Михаил Нуридинов    
## <a name="urls">Ссылки 🔗</a>
 
- [ссылка на яндекс диск]( https://disk.yandex.ru/)    