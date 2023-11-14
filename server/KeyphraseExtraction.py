from keybert import KeyBERT
from konlpy.tag import Okt
from sentence_transformers import SentenceTransformer

sentence_model = SentenceTransformer(
    model_name_or_path="paraphrase-multilingual-mpnet-base-v2"
)
kw_model = KeyBERT(model=sentence_model)
okt = Okt()


def NounExtraction(document):
    return list(set(okt.nouns(document)))

def keywordExtraction(document):
    keywords = kw_model.extract_keywords(
        docs=document, keyphrase_ngram_range=(1, 1), stop_words=None, top_n=5
    )
    keywordset = []
    keywords = [keyword[0] for keyword in keywords]
    for i in keywords:
        pos = okt.pos(i)
        for word in pos:
            if word[1] == "Noun" and word[0] not in keywordset:
                keywordset.append(word[0])
    return keywordset
