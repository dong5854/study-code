import os
import requests
import pandas as pd
from bs4 import BeautifulSoup as bs
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from datetime import datetime

# 현재 시간 저장 - 파일 이름 생성
date = str(datetime.now())
date = date[:date.rfind(':')].replace(' ', '_')
date = date.replace(':', '시') + '분'

# 검색어 입력
search_word = input('구글 뉴스에서 검색할 단어를 입력하세요.')

# 웹드라이버 옵션 - 창 뜨지 않도록
options = webdriver.ChromeOptions()
options.headless = True
options.add_argument('window-size=1920x1080')
options.add_argument("disable-gpu")
options.add_argument(
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.70 Safari/537.36")

# 웹드라이버 호출
driver = webdriver.Chrome(r"/home/ubuntu/django-project/chromedriver", options=options)
driver.get('https://news.google.com/?hl=ko&gl=KR&ceid=KR%3Ako')
driver.implicitly_wait(3)

# Google News 검색창 Xpath
search = driver.find_element_by_xpath(
    '//*[@id="gb"]/div[2]/div[2]/div/form/div[1]/div/div/div/div/div[1]/input[2]')

# 검색어 입력 및 실행
search.send_keys(search_word)
search.send_keys(Keys.ENTER)
driver.implicitly_wait(30)

# 현재 주소 가져오기
url = driver.current_url

# 현재 주소로부터 'lxml' 파싱
resp = requests.get(url)
soup = bs(resp.text, 'lxml')

# 제목, 주소의 빈 리스트 자료형 만들기
titles = []
links = []

# `lxml` 파싱한 결과물에서 제목과 링크 추출 후 데이터로 저장
for link in soup.select('h3 > a'):
    href = 'https://news.google.com' + link.get('href')[1:]
    title = link.string
    titles.append(title)
    links.append(href)

data = {'title': titles, 'link': links}
data_frame = pd.DataFrame(data, columns=['title', 'link'])

file_name = '구글뉴스_{}_{}'.format(search_word, date)

data_frame.to_csv('/home/ubuntu/django-project/crawling/result/' + file_name + '.csv')
data_frame.to_excel('/home/ubuntu/django-project/crawling/result/' + file_name + '.xlsx')

folder_path = '/home/ubuntu/django-project/crawling/result'

print('저장 완료 | 경로 : {}\\{}'.format(folder_path, file_name))
os.startfile(folder_path)