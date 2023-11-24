from ai.lecture_notes.llama_predict import llama_promt
from transformers import AutoModelForSeq2SeqLM, AutoTokenizer
from fuzzywuzzy import fuzz

from langdetect import detect
from nltk.stem import WordNetLemmatizer
from pymorphy2 import MorphAnalyzer
import nltk

from ai.transcriptor.Exctract_keywords import get_keywords, combined_stop_words
from ai.transcriptor.STT import speech2text

nltk.download('wordnet')

model_name = "facebook/nllb-200-distilled-600M"
model_t = AutoModelForSeq2SeqLM.from_pretrained(model_name)
tokenizer = AutoTokenizer.from_pretrained(model_name)

d_langs_t = {'Английский': 'eng_Latn',
             'Датский': 'dan_Latn',
             'Испанский': 'spa_Latn',
             'Итальянский': 'ita_Latn',
             'Китайский': 'zho_Hans',
             'Немецкий': 'deu_Latn',
             'Польский': 'pol_Latn',
             'Португальский': 'por_Latn',
             'Турецкий': 'tur_Latn',
             'Французский': 'fra_Latn',
             'Чешский': 'ces_Latn',
             'Русский': 'rus_Cyrl'
             # 'Японский': 'jpn_Jpan',
             }

def lemmatize_word(word):
    # Определяем язык слова
    language = detect(word)

    if language == "en":
        lemmatizer = WordNetLemmatizer()
        return lemmatizer.lemmatize(word)
    elif language == "ru":
        morph = MorphAnalyzer()
        return morph.parse(word)[0].normal_form
    else:
        return word  # Если язык не определен или не поддерживается

# Define a function to remove similar words
def remove_similar_words(keywords):
    import pymorphy2
    morph = pymorphy2.MorphAnalyzer()
    unique_keywords = []
    for keyword in keywords:
        is_similar = False
        for unique_keyword in unique_keywords:
            if fuzz.ratio(keyword[0], unique_keyword[0]) > 60:
                is_similar = True
                break
        if not is_similar:
            #teg = morph.parse(keyword[0])[0]
            unique_keywords.append((lemmatize_word(keyword[0]), keyword[1]))
    return unique_keywords
def translator(text, target_language):
    inputs = tokenizer(text, return_tensors="pt")
    outputs = model_t.generate(**inputs, forced_bos_token_id=tokenizer.lang_code_to_id[target_language])
    return tokenizer.batch_decode(outputs, skip_special_tokens=True)

def sound_to_text(audio_file):
    lang = 'Русский'
    conspect = speech2text(audio_file)
    """
    С тайм кодами разбивка + конспект лекции
    timecode_with_text': [[x['start'], x['end'], x['text']] for x in data['segments']],
        'text': data['text']
        {'timecode_with_text': [[0.0, 22.0, ' Python это высокоуровневый язык программирования общего назначения 
        с динамической строготипизацией и автоматическим управлением памятью, ориентированный на повышение 
        производительности разработчика, читаемости кода и его качества, а также на обеспечение переносимости 
        написанных на нем программ.'], [22.0, 30.0, ' Python на сегодняшний момент является самым популярным 
        языком программирования для бэкенд разработки.']], 
        'text': ' Python это высокоуровневый язык программирования 
        общего назначения с динамической строготипизацией и автоматическим управлением памятью, ориентированный 
        на повышение производительности разработчика, читаемости кода и его качества, а также на обеспечение 
        переносимости написанных на нем программ. Python на сегодняшний момент является самым популярным языком 
        программирования для бэкенд разработки.'}
    """
    print(conspect)
    text = conspect['text']
    termins = get_keywords(text, stopwords=combined_stop_words, keyphrase_ngram_range=(1, 1), top_n=25)
    # Remove similar words
    termins = remove_similar_words(termins)
    print(termins)
    """[('python', 0.4077), ('программирования', 0.31), ('разработчика', 0.2249)]"""
    out = []
    for x in termins:
        if len(x[0]) < 499:
            out.append(translator(llama_promt(x[0]), d_langs_t.get(lang, 'rus_Cyrl')))
        else:
            print("превышен порог в 500 символов")
    print(out)
    return out, conspect, termins

sound_to_text('./python_term_example.mp3')
