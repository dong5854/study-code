# import feedparser
import requests
from bs4 import BeautifulSoup
from datetime import datetime, timedelta
from pymongo import MongoClient


dongnae_open_url = 'http://www.kma.go.kr/wid/queryDFSRSS.jsp?zone=3114067000'
# 중기예보 3일후의 날씨부터만 보여주는 듯 함
midterm_open_url = 'https://www.weather.go.kr/weather/forecast/mid-term-rss3.jsp?stnId=159'


# 최고온도 혹은 최저온도가 -999면 값이 없는 것

# ---함수---
def most_frequent(data):
    return max(data, key=data.count)
# ---------


# ---DB 세팅---
client = MongoClient(
    username='FIREMOTH',
    password='glacksqnfskqkd1!'
)

db = client.portwebsite_db  # portwebsite_db가 우리 데이터베이스 이름
# --------


# ---동네예보---
res = requests.get(dongnae_open_url)
text = res.text

soup = BeautifulSoup(text, 'lxml-xml')  # XML 파서

data_seqs = soup.find_all('data')

date_one = 0
date_one_tmx = -999  # 다음날 최고온도
date_one_tmn = 100  # 다음날 최저온도
date_one_wfKor = []  # 다음날 날씨
date_one_pop = 0  # 다음날 강수확률
date_one_pop_cnt = 0  # 다음날 강수확률 카운터

date_two = 0
date_two_tmx = -999  # 다다음날 최고온도
date_two_tmn = 100  # 다다음날 최저온도
date_two_wfKor = []  # 다다음날 날씨
date_two_pop = 0  # 다다음날 강수확률
date_two_pop_cnt = 0  # 다다음날 강수확률 카운터

date_zero = 0
date_zero_tmx = -999  # 오늘 최고온도
date_zero_tmn = 100  # 오늘 최저온도
date_zero_wfKor = []  # 오늘 날씨
date_zero_pop = 0  # 오늘 강수확률
date_zero_pop_cnt = 0  # 오늘 강수확률 카운터

for data_seq in data_seqs:
    if(1 == int(data_seq.find('day').text)):
        d = datetime.now() + timedelta(days=1)  # 내일
        date_one = d.strftime('%Y-%m-%d %H:%M:%S')

        date_one_wfKor.append(data_seq.find('wfKor').text)

        if date_one_tmn > float(data_seq.find('tmn').text):
            date_one_tmn = float(data_seq.find('tmn').text)  # 내일의 최저온도 삽입

        if date_one_tmx < float(data_seq.find('tmx').text):
            date_one_tmx = float(data_seq.find('tmx').text)  # 내일의 최고온도 삽입

        date_one_pop += int(data_seq.find('pop').text)
        date_one_pop_cnt += 1

    elif(2 == int(data_seq.find('day').text)):
        d = datetime.now() + timedelta(days=2)  # 내일모레
        date_two = d.strftime('%Y-%m-%d %H:%M:%S')

        date_two_wfKor.append(data_seq.find('wfKor').text)

        if date_two_tmn > float(data_seq.find('tmn').text):
            date_two_tmn = float(data_seq.find('tmn').text)  # 내일의 최저온도 삽입

        if date_two_tmx < float(data_seq.find('tmx').text):
            date_two_tmx = float(data_seq.find('tmx').text)  # 내일의 최고온도 삽입

        date_two_pop += int(data_seq.find('pop').text)
        date_two_pop_cnt += 1

    elif(0 == int(data_seq.find('day').text)):
        d = datetime.now()  # 오늘
        date_zero = d.strftime('%Y-%m-%d %H:%M:%S')

        date_zero_wfKor.append(data_seq.find('wfKor').text)

        if date_zero_tmn > float(data_seq.find('tmn').text):
            date_zero_tmn = float(data_seq.find('tmn').text)  # 내일의 최저온도 삽입

        if date_zero_tmx < float(data_seq.find('tmx').text):
            date_zero_tmx = float(data_seq.find('tmx').text)  # 내일의 최고온도 삽입

        date_zero_pop += int(data_seq.find('pop').text)
        date_zero_pop_cnt += 1

print(date_zero_wfKor)

print(date_zero, most_frequent(date_zero_wfKor), date_zero_tmn,
      date_zero_tmx, round(date_zero_pop/date_zero_pop_cnt, -1))

print(date_one, most_frequent(date_one_wfKor), date_one_tmn,
      date_one_tmx, round(date_one_pop/date_one_pop_cnt, -1))

print(date_two, most_frequent(date_two_wfKor), date_two_tmn,
      date_two_tmx, round(date_two_pop/date_two_pop_cnt, -1))

post_list = [
    {
        "시간": date_zero,
        "날씨": most_frequent(date_zero_wfKor),
        "최저온도": str(date_zero_tmn),
        "최고온도": str(date_zero_tmx),
        "강수확률": str(round(date_zero_pop/date_zero_pop_cnt, -1))
    },
    {
        "시간": date_one,
        "날씨": most_frequent(date_one_wfKor),
        "최저온도": str(date_one_tmn),
        "최고온도": str(date_one_tmx),
        "강수확률": str(round(date_one_pop/date_one_pop_cnt, -1))
    },
    {
        "시간": date_two,
        "날씨": most_frequent(date_two_wfKor),
        "최저온도": str(date_two_tmn),
        "최고온도": str(date_two_tmx),
        "강수확률": str(round(date_two_pop/date_two_pop_cnt, -1))
    }
]
# ---중기예보---

res = requests.get(midterm_open_url)
text = res.text

soup = BeautifulSoup(text, 'lxml-xml')  # XML 파서

locations = soup.find_all('location')

for location in locations:
    location_text = location.find('city').text
    if(location_text == "울산"):
        data = location.find_all('data')
        for datum in data:
            print(location_text)  # 위치
            print(datum.find('tmEf').text)  # 날짜 yyyy-mm-dd 00:00
            print(datum.find('wf').text)  # 날씨예보
            print('최저온도:' + datum.find('tmn').text + '°C')  # 최저온도
            print('최고온도:' + datum.find('tmx').text + '°C')  # 최고온도
            print('강수확률' + datum.find('rnSt').text + '%')  # 강수확률
            post_list.append({
                "시간": datum.find('tmEf').text,
                "날씨": datum.find('wf').text,
                "최저온도": datum.find('tmn').text,
                "최고온도": datum.find('tmx').text,
                "강수확률": datum.find('rnSt').text
            },)

#---DB 삽입---
db.울산일기예보.drop()  # 콜랙선 초기화(최신의 일기예보만 저장하기 위해)
collection = db.울산일기예보
posts = db.울산일기예보
post_id = posts.insert_many(post_list)