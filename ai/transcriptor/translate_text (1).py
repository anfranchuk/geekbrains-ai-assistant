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
            # 'Японский': 'jpn_Jpan',
            }

def translate(text, target_language):
    inputs = tokenizer(text, return_tensors="pt")
    outputs = model_t.generate(**inputs, forced_bos_token_id=tokenizer.lang_code_to_id[target_language])
    return tokenizer.batch_decode(outputs, skip_special_tokens=True)

lang = 'Английский'
text = ''

print(translate(text, d_langs_t.get(lang, 'eng_Latn'))[0])