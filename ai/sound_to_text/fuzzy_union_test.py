from fuzzywuzzy import fuzz

sentence1 = "Кирилл"
sentence2 = "Кирилл"

similarity_ratio = fuzz.ratio(sentence1, sentence2)

print(similarity_ratio)