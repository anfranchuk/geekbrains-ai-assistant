import whisper
from pathlib import Path
import shutil
from pydub import AudioSegment
import math
import re

model_type_stt="medium"
# # Load the Whisper model
model = whisper.load_model(model_type_stt)

def split_audio(file_path, segment_length_ms):
    # Загрузка аудиофайла
    audio = AudioSegment.from_file(file_path)

    # Длительность аудио в миллисекундах
    duration_ms = len(audio)

    # Проверка, нужно ли разбивать аудио
    if duration_ms <= segment_length_ms:
        print("Аудиофайл меньше или равен заданной длительности сегмента. Разбиение не требуется.")
        return False

    # Количество фрагментов
    segments_count = math.ceil(duration_ms / segment_length_ms)

    Path('./segments').mkdir(exist_ok=True)

    for i in range(segments_count):
        # Начало и конец сегмента
        start_ms = i * segment_length_ms
        end_ms = min((i + 1) * segment_length_ms, duration_ms)

        # Извлечение сегмента
        segment = audio[start_ms:end_ms]

        # Сохранение сегмента в файл
        segment.export(f"./segments/segment_{i}.mp3", format="mp3")
    return True

def transcribe_with_whisper(audio_file, model=model):
    # Transcribe the audio
    return model.transcribe(audio_file)

def speech2text(audio_file):
    data = transcribe_with_whisper(audio_file)
    return {
        'timecode_with_text': [[x['start'], x['end'], x['text']] for x in data['segments']],
        'text': data['text']
    }

def delete_directory_with_content(directory_path):
    """
    Deletes a directory along with all of its content using pathlib.

    Args:
    directory_path (str): Path of the directory to be deleted.
    """
    dir_path = Path(directory_path)
    if dir_path.exists() and dir_path.is_dir():
        shutil.rmtree(dir_path)
    else:
        print(f"Directory {directory_path} does not exist or is not a directory.")

def contains_no_russian_characters(text):
    """
    Checks if a given string does not contain any Russian characters.

    Args:
    text (str): The string to be checked.

    Returns:
    bool: True if the string does not contain Russian characters, False otherwise.
    """
    # Regular expression to match Russian characters
    russian_char_pattern = re.compile('[А-Яа-яёЁ]')

    # Search for any Russian characters
    if russian_char_pattern.search(text):
        return False
    return True

def clear_data(data):
    data_new = {'timecode_with_text': [], 'text': ''}
    for row in data:
        if not contains_no_russian_characters(row[-1]):
            data_new['timecode_with_text'].append(row)
            data_new['text'] += row[-1]
    return data_new

def timecodes_and_full_text(mp3_path):
    # 1. разбить файл на сегменты по 5 минутам (600000 миллисекунд)
    if split_audio(mp3_path, 300000):
        print('Аудиофайл разбит на сегменты')
        # 2. Прокидываем разделенные аудиофайлы в whisper циклом
        # full_text = ''
        timecode_with_text = None

        for seg in Path('./segments').iterdir():
            data = speech2text(str(seg))
            # full_text += data['text']
            if timecode_with_text is not None:
                timecode_with_text.extend(data['timecode_with_text'])
            else:
                timecode_with_text = []
                timecode_with_text.extend(data['timecode_with_text'])

        # 3. Удаляю директорию с аудиофайлами
        delete_directory_with_content('./segments')

        # 4. Зачищаю полученный словарь с таймкодами от бреда и возращаю тот же словарь, но с очищенными таймкодами и полным текстом
        return clear_data(timecode_with_text)
    else:
        print('Аудиофайл не разбит на сегменты')
        return speech2text(mp3_path)

