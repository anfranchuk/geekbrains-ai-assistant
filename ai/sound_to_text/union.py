from transformers import pipeline

nlp = pipeline("text-classification", model="bert-base-uncased")

previous_text = "Python"
new_text = "Python"

print(f"Предыдущее предложение: {previous_text}")
print(f"Новое предложение: {new_text}")

result = nlp([previous_text, new_text])
classification = result[0]["label"]
confidence = result[0]["score"]

if classification == "ENTAILMENT":
    print("Новое предложение связано с предыдущим текстом.")
else:
    print("Новое предложение не связано с предыдущим текстом.")

print(f"Уверенность: {confidence}")

