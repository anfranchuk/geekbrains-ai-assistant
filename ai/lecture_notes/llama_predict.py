from llama_cpp import Llama

llm = Llama(model_path="./llama.cpp/models/llama-2-7b-chat.ggmlv3.q4_K_M.gguf.bin", chat_format="llama-2")


def llama_promt(termin):
    response = llm.create_chat_completion(
        messages=[
            {"role": "system", "content": "Что такое " + termin + "? одним предложением"}
        ]
    )
    return response["choices"][0]["message"]["content"]


def llama_text_promt(termin):
    response = llm.create_chat_completion(
        messages=[
            {"role": "system", "content": "Сделай более читаемым следующий текст. Ответ ответ только на русском языке:" + termin}
        ]
    )
    return response["choices"][0]["message"]["content"]

print(llama_promt("полиморфизм"))
print(llama_text_promt("Перечислите названия подразделов урока, и описание в одном предложении того, что и зачем вы в них будете рассказывать. Для этого можно воспользоваться формулировками образовательных результатов из программы, но переформулировать их на языке, понятном студенту ли обозначить темы и тезисы."))
