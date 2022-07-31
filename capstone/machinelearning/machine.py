import re
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import urllib.request
from collections import Counter
from konlpy.tag import Mecab
from sklearn.model_selection import train_test_split
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
import tensorflow
from tensorflow.python.keras.models import load_model
from tensorflow.keras.layers import Embedding, Dense, GRU
from tensorflow.keras.models import Sequential
from tensorflow.keras.models import load_model
from tensorflow.keras.callbacks import EarlyStopping, ModelCheckpoint


stopwords = ['도', '는', '다', '의', '가', '이', '은', '한', '에', '하', '고', '을', '를', '인', '듯', '과', '와', '네', '들', '듯', '지', '임', '게','으로','하다','자']
max_len = 80
mecab = Mecab()
tokenizer = Tokenizer()

def train():
  # urllib.request.urlretrieve("https://raw.githubusercontent.com/bab2min/corpus/master/sentiment/naver_shopping.txt", filename="ratings_total.txt")
  total_data = pd.read_table('ratings_total.txt', names=['ratings', 'reviews'])

  total_data['label'] = np.select([total_data.ratings > 3], [1], default=0)
  total_data['ratings'].nunique(), total_data['reviews'].nunique(), total_data['label'].nunique()
  total_data.drop_duplicates(subset=['reviews'], inplace=True) # reviews 열에서 중복인 내용이 있다면 중복 제거

  train_data, test_data = train_test_split(total_data, test_size = 0.25, random_state = 42)
  train_data['label'].value_counts().plot(kind = 'bar')

  # 한글과 공백을 제외하고 모두 제거
  train_data['reviews'] = train_data['reviews'].str.replace("[^ㄱ-ㅎㅏ-ㅣ가-힣 ]","")
  train_data['reviews'].replace('', np.nan, inplace=True)

  test_data.drop_duplicates(subset = ['reviews'], inplace=True) # 중복 제거
  test_data['reviews'] = test_data['reviews'].str.replace("[^ㄱ-ㅎㅏ-ㅣ가-힣 ]","") # 정규 표현식 수행
  test_data['reviews'].replace('', np.nan, inplace=True) # 공백은 Null 값으로 변경
  test_data = test_data.dropna(how='any') # Null 값 제거

  mecab = Mecab()
  train_data['tokenized'] = train_data['reviews'].apply(mecab.morphs)
  train_data['tokenized'] = train_data['tokenized'].apply(lambda x: [item for item in x if item not in stopwords])
  test_data['tokenized'] = test_data['reviews'].apply(mecab.morphs)
  test_data['tokenized'] = test_data['tokenized'].apply(lambda x: [item for item in x if item not in stopwords])

  negative_words = np.hstack(train_data[train_data.label == 0]['tokenized'].values)
  positive_words = np.hstack(train_data[train_data.label == 1]['tokenized'].values)

  negative_word_count = Counter(negative_words)
  positive_word_count = Counter(positive_words)

  fig,(ax1,ax2) = plt.subplots(1,2,figsize=(10,5))
  text_len = train_data[train_data['label']==1]['tokenized'].map(lambda x: len(x))
  ax1.hist(text_len, color='red')
  ax1.set_title('Positive Reviews')
  ax1.set_xlabel('length of samples')
  ax1.set_ylabel('number of samples')

  text_len = train_data[train_data['label']==0]['tokenized'].map(lambda x: len(x))
  ax2.hist(text_len, color='blue')
  ax2.set_title('Negative Reviews')
  fig.suptitle('Words in texts')
  ax2.set_xlabel('length of samples')
  ax2.set_ylabel('number of samples')
  #여기까지 오케이 오케이

  X_train = train_data['tokenized'].values
  y_train = train_data['label'].values
  X_test= test_data['tokenized'].values
  y_test = test_data['label'].values

  tokenizer = Tokenizer()
  tokenizer.fit_on_texts(X_train)

  threshold = 2
  total_cnt = len(tokenizer.word_index) # 단어의 수
  rare_cnt = 0 # 등장 빈도수가 threshold보다 작은 단어의 개수를 카운트
  total_freq = 0 # 훈련 데이터의 전체 단어 빈도수 총 합
  rare_freq = 0 # 등장 빈도수가 threshold보다 작은 단어의 등장 빈도수의 총 합

  # 단어와 빈도수의 쌍(pair)을 key와 value로 받는다.
  for key, value in tokenizer.word_counts.items():
      total_freq = total_freq + value

      # 단어의 등장 빈도수가 threshold보다 작으면
      if(value < threshold):
          rare_cnt = rare_cnt + 1
          rare_freq = rare_freq + value

  vocab_size = total_cnt - rare_cnt + 2
  tokenizer = Tokenizer(vocab_size, oov_token = 'OOV') 
  tokenizer.fit_on_texts(X_train)
  X_train = tokenizer.texts_to_sequences(X_train)
  X_test = tokenizer.texts_to_sequences(X_test)

  def below_threshold_len(max_len, nested_list):
    count = 0
    for sentence in nested_list:
      if(len(sentence) <= max_len):
          count = count + 1

  
  below_threshold_len(max_len, X_train)
  X_train = pad_sequences(X_train, maxlen = max_len)
  X_test = pad_sequences(X_test, maxlen = max_len)

loaded_model = tensorflow.keras.models.load_model('gb_model.h5')
def sentiment_predict(new_sentence):

  new_sentence = mecab.morphs(new_sentence) # 토큰화
  new_sentence = [word for word in new_sentence if not word in stopwords] # 불용어 제거

  encoded = tokenizer.texts_to_sequences([new_sentence]) # 정수 인코딩
  pad_new = pad_sequences(encoded, maxlen = max_len) # 패딩
  score = float(loaded_model.predict(pad_new)) # 예측
  if(score > 0.5):
    print("{:.2f}% 확률로 긍정 리뷰입니다.".format(score * 100))
    return (["good", round(score * 100, 2)])
  else:
    print("{:.2f}% 확률로 부정 리뷰입니다.".format((1 - score) * 100))
    return (["bad", round((1 - score) * 100, 2)])

print(sentiment_predict('여기 노트북 너무 무겁다'))
print(sentiment_predict('아니 미친새끼야 진짜 도랐냐.'))
