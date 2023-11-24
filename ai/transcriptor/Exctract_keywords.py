# Импорт необходимых библиотек
from keybert import KeyBERT
from sentence_transformers import SentenceTransformer

######
# Загрузка стоп-слов (если необходимо)
import nltk

from ai.transcriptor.STT import speech2text

# Загрузка списков стоп-слов для английского и русского языков
nltk.download('stopwords')
from nltk.corpus import stopwords
stop_words_en = stopwords.words('english')
stop_words_ru = stopwords.words('russian')

# Объединение английских и русских стоп-слов
combined_stop_words = stop_words_en + stop_words_ru
######



def get_keywords(text, stopwords=None, keyphrase_ngram_range=(1, 1), top_n=10):
    # Загрузка модели
    # model = SentenceTransformer('ai-forever/sbert_large_nlu_ru')
    model = SentenceTransformer('distiluse-base-multilingual-cased')
    # Инициализация KeyBERT с выбранной моделью
    kw_model = KeyBERT(model=model)
    '''
    На входе: текст (str), стоп-слова, топ n ключевых слов.
    На выходе: список из кортежей с ключевой фразой (словом) и его вес: [(str, float)]
    Можно
    '''
    return kw_model.extract_keywords(text, stop_words=stopwords, keyphrase_ngram_range=keyphrase_ngram_range, top_n=top_n)

