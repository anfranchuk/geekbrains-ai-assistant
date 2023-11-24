from llama_cpp import Llama

llm = Llama(model_path="./llama.cpp/models/llama-2-7b-chat.ggmlv3.q4_K_M.gguf.bin", chat_format="llama-2")

def llama_promt(termin):
    response = llm.create_chat_completion(
        messages = [
            {"role": "system", "content": "Что такое " + termin + "? одним предложением"}
        ]
    )
    return response["choices"][0]["message"]["content"]

print(llama_promt("полиморфизм"))
