import subprocess
import speech_recognition as sr

# Создаем объект Recognizer
r = sr.Recognizer()


# Convert audio file to WAV format
input_file = 'audio1.mp3'
output_file = 'audio1.wav'
subprocess.call(['ffmpeg', '-i', input_file, output_file])

# Загружаем аудиофайл
audio_file = 'audio1.wav'
with sr.AudioFile(audio_file) as source:
    # Читаем аудио из файла
    audio = r.record(source)

    try:
        # Используем Google Speech Recognition для распознавания речи
        #text = r.recognize_google(audio)
        text = r.recognize_google(audio, language="ru-RU")
        print(f"Распознанный текст: {text}")
    except sr.UnknownValueError:
        print("Не удалось распознать речь")
    except sr.RequestError as e:
        print(f"Ошибка запроса к сервису распознавания речи: {e}")
