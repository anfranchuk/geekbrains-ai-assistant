from collections import Counter
from difflib import SequenceMatcher

def find_similar_and_duplicate_words(text):
    words = text.lower().split()
    counter = Counter(words)
    duplicates = set()
    similar_words = set()

    for word, count in counter.items():
        if count > 1:
            duplicates.add(word)

        for other_word in counter.keys():
            if word != other_word and SequenceMatcher(None, word, other_word).ratio() > 0.8:
                similar_words.add(word)
                similar_words.add(other_word)

    return duplicates, similar_words

text = "This is a sample text with some repeated words like this and that and this"
duplicate_words, similar_words = find_similar_and_duplicate_words(text)
print("Duplicate words:", duplicate_words)
print("Similar words:", similar_words)




суммаризация речи от файсбука
