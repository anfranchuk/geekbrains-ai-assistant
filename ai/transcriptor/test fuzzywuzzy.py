from fuzzywuzzy import fuzz

def remove_similar_words(keywords):
    unique_keywords = []
    for keyword in keywords:
        is_similar = False
        for unique_keyword in unique_keywords:
            if fuzz.ratio(keyword[0], unique_keyword[0]) > 60:
                is_similar = True
                break
        if not is_similar:
            unique_keywords.append(keyword)
    return unique_keywords

keywords = [('алгоритмах', 0.2895), ('алгоритмы', 0.2834), ('алгоритме', 0.2832), ('алгоритма', 0.2806), ('алгоритмов', 0.2786), ('алгоритм', 0.2743), ('алгоритмическое', 0.2717), ('программированием', 0.2317), ('программистами', 0.2303), ('программирования', 0.2241), ('программирование', 0.2221), ('вычислением', 0.2193), ('программисты', 0.2145), ('hello', 0.2143), ('привет', 0.2142), ('программистов', 0.212), ('программировать', 0.2101), ('компилятора', 0.2089), ('вычисления', 0.2048), ('арифметического', 0.2026), ('программировании', 0.2024), ('арифметики', 0.201), ('арифметика', 0.1914), ('арифметических', 0.1901), ('приветствовать', 0.1883)]

unique_keywords = remove_similar_words(keywords)
print(unique_keywords)
