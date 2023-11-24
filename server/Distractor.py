from gensim.models import Word2Vec
import KeyphraseExtraction
import random

def get_distractor(text, keyword):
    model = Word2Vec.load('./ko.model')
    nouns = KeyphraseExtraction.NounExtraction(text)
    score = []
    for noun in nouns:
        try:
            sim_score = model.wv.similarity(keyword, noun)
        except:
            sim_score = 0
        score.append((noun, sim_score))
    score = sorted(score, key = lambda x: (-x[1], x[0]))
    score = [value[0] for value in score[0:4]]
    # random.shuffle(score)
    return score