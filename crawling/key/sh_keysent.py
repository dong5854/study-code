#-*- coding: utf-8 -*-
from collections import Counter
from collections import defaultdict
from scipy.sparse import csr_matrix
import numpy as np
from sklearn.preprocessing import normalize
from konlpy.tag import Komoran
from crawling.textrank import KeywordSummarizer
from crawling.textrank import KeysentenceSummarizer


def keysents(sents):
    
    komoran = Komoran()
    def komoran_tokenize(sent):
        words = komoran.pos(sent, join=True)
        words = [w for w in words if ('/NN' in w or '/XR' in w or '/VA' in w or '/VV' in w)]
        return words

    keyword_extractor = KeywordSummarizer(
        tokenize = komoran_tokenize,
        window = -1,
        verbose = False
    )

    keywords = keyword_extractor.summarize(sents, topk=30)

    #중요한 단어일수록 점수 높음!
    #def komoran_tokenize(sent):
    #    return komoran.pos(sent, join=True)

    #keyword_extractor = KeywordSummarizer(tokenize = komoran_tokenize, window = -1)
    #keywords = keyword_extractor.summarize(sents, topk=30)

    #이상한 ㄴ같은거 걸러냄
    def komoran_tokenize(sent):
        words = komoran.pos(sent, join=True)
        words = [w for w in words if ('/NN' in w or '/XR' in w or '/VA' in w or '/VV' in w)]
        return words

    keyword_extractor = KeywordSummarizer(tokenize = komoran_tokenize, window = 2)
    keywords = keyword_extractor.summarize(sents, topk=30)

    #키워드로 이끌어낸 keysents
    summarizer = KeysentenceSummarizer(tokenize = komoran_tokenize, min_sim = 0.3)
    keysents = summarizer.summarize(sents, topk=2)
    #print(keywords)

    #문장위치로 중요도 다르게 설정
    bias = np.ones(len(sents))
    bias[-1] = 10
    keysents = summarizer.summarize(sents, topk=3, bias=bias)


    #단어그래프 만들기위해
    def scan_vocabulary(sents, tokenize, min_count=2):
        counter = Counter(w for sent in sents for w in tokenize(sent))
        counter = {w:c for w,c in counter.items() if c >= min_count}
        idx_to_vocab = [w for w, _ in sorted(counter.items(), key=lambda x:-x[1])]
        vocab_to_idx = {vocab:idx for idx, vocab in enumerate(idx_to_vocab)}
        return idx_to_vocab, vocab_to_idx

    #두 단어 간의 유사도 정의를 위해
    def cooccurrence(tokens, vocab_to_idx, window=2, min_cooccurrence=2):
        counter = defaultdict(int)
        for s, tokens_i in enumerate(tokens):
            vocabs = [vocab_to_idx[w] for w in tokens_i if w in vocab_to_idx]
            n = len(vocabs)
            for i, v in enumerate(vocabs):
                if window <= 0:
                    b, e = 0, n
                else:
                    b = max(0, i - window)
                    e = min(i + window, n)
                for j in range(b, e):
                    if i == j:
                        continue
                    counter[(v, vocabs[j])] += 1
                    counter[(vocabs[j], v)] += 1
        counter = {k:v for k,v in counter.items() if v >= min_cooccurrence}
        n_vocabs = len(vocab_to_idx)
        return dict_to_mat(counter, n_vocabs, n_vocabs)

    def dict_to_mat(d, n_rows, n_cols):
        rows, cols, data = [], [], []
        for (i, j), v in d.items():
            rows.append(i)
            cols.append(j)
            data.append(v)
        return csr_matrix((data, (rows, cols)), shape=(n_rows, n_cols))

    #불필요한 단어 제거하기 위해
    def word_graph(sents, tokenize=None, min_count=2, window=2, min_cooccurrence=2):
        idx_to_vocab, vocab_to_idx = scan_vocabulary(sents, tokenize, min_count)
        tokens = [tokenize(sent) for sent in sents]
        g = cooccurrence(tokens, vocab_to_idx, window, min_cooccurrence)
        return g, idx_to_vocab

    #pagerank를 학습하는 함수
    def pagerank(x, df=0.85, max_iter=30):
        assert 0 < df < 1

        # initialize
        A = normalize(x, axis=0, norm='l1')
        R = np.ones(A.shape[0]).reshape(-1,1)
        bias = (1 - df) * np.ones(A.shape[0]).reshape(-1,1)

        # iteration
        for _ in range(max_iter):
            R = df * (A * R) + bias

        return R

    def textrank_keyword(sents, tokenize, min_count, window, min_cooccurrence, df=0.85, max_iter=30, topk=30):
        g, idx_to_vocab = word_graph(sents, tokenize, min_count, window, min_cooccurrence)
        R = pagerank(g, df, max_iter).reshape(-1)
        idxs = R.argsort()[-topk:]
        keywords = [(idx_to_vocab[idx], R[idx]) for idx in reversed(idxs)]
        return keywords


    keysents_l = []
    for i in keysents:
        k = i[2]
        keysents_l.append(k)
    
    return keysents_l
