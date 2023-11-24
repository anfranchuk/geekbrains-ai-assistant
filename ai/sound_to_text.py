from ai.lecture_notes.llama_predict import llama_promt
from ai.transcriptor.Exctract_keywords import get_keywords, combined_stop_words
from ai.transcriptor.STT import speech2text
"""from transformers import MarianMTModel, MarianTokenizer
from typing import Sequence

class Translator:
    def __init__(self, source_lang: str, dest_lang: str) -> None:
        self.model_name = f'Helsinki-NLP/opus-mt-{source_lang}-{dest_lang}'
        self.model = MarianMTModel.from_pretrained(self.model_name)
        self.tokenizer = MarianTokenizer.from_pretrained(self.model_name)

    def translate(self, texts: Sequence[str]) -> Sequence[str]:
        tokens = self.tokenizer(list(texts), return_tensors="pt", padding=True)
        translate_tokens = self.model.generate(**tokens)
        return [self.tokenizer.decode(t, skip_special_tokens=True) for t in translate_tokens]"""

from transformers import AutoModelForSeq2SeqLM, AutoTokenizer

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

def translator(text, target_language):
    inputs = tokenizer(text, return_tensors="pt")
    outputs = model_t.generate(**inputs, forced_bos_token_id=tokenizer.lang_code_to_id[target_language])
    return tokenizer.batch_decode(outputs, skip_special_tokens=True)
"""def translate_text(text):
    translator = Translator(to_lang="ru")
    translation = translator.translate(text)
    return translation"""
def main():
    lang = 'Русский'
    audio_file = './python_term_example.mp3'
    result = speech2text(audio_file)
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
    print(result)
    text = result['text']
    data = get_keywords(text, stopwords=combined_stop_words, keyphrase_ngram_range=(1, 1), top_n=10)
    print(data)
    """[('python', 0.4077), ('программирования', 0.31), ('разработчика', 0.2249)]"""

    out = []
    for x in data:
        if len(x[0]) < 499:
            out.append(translator(llama_promt(x[0]), d_langs_t.get(lang, 'rus_Cyrl')))
        else:
            print("превышен порог в 500 символов")
    print(out)
    return out, result, data


main()
