# 

# -*- coding: utf-8 -*-

import os
import requests
import pandas as pd
from bs4 import BeautifulSoup as bs
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from datetime import datetime
from newspaper import Article
from crawling import sh_keyword
from crawling import sh_keysent

def Google_News(keyword):
# 현재 시간 저장 - 파일 이름 생성
    date = str(datetime.now())
    date = date[:date.rfind(':')].replace(' ', '_')
    date = date.replace(':', '시') + '분'

    # 검색어 입력
    search_word = keyword

    # 웹드라이버 옵션 - 창 뜨지 않도록
    options = webdriver.ChromeOptions()
    options.headless = True
    options.add_argument('window-size=1920x1080')
    options.add_argument("disable-gpu")
    options.add_argument(
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.70 Safari/537.36")

    # 웹드라이버 호출
    driver = webdriver.Chrome(r'/home/ubuntu/django-project/chromedriver', options=options)
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

    # 기사 본문 불러오기 준비
    article = Article(url, language = 'ko')
    article.download()
    article.parse()

    # 현재 주소로부터 'lxml' 파싱
    resp = requests.get(url)
    soup = bs(resp.text, 'lxml')

    # 제목, 주소의 빈 리스트 자료형 만들기
    titles = []
    links = []
    texts = []
    words = []

    keywords = []

    n=0
    # `lxml` 파싱한 결과물에서 제목과 링크 추출 후 데이터로 저장
    for link in soup.select('h3 > a'):
        href = 'https://news.google.com' + link.get('href')[1:]
        title = link.string 
        
        
        article = Article(href, language='ko')
        try:
            article.download()
            article.parse()
        except:
            article.text = " "
        text = article.text
        sents = text.split('.')

        try: 
            keysents = sh_keysent.keysents(sents)
        except ValueError:
            keysents = " "
        if keysents == " ":
            continue
        texts.append(keysents)
        titles.append(title) 
        links.append(href)
        try: 
            keywords = sh_keyword.keywords(sents)
        except ValueError:
            keywords = " "
        
        words.append(keywords)
        n += 1
        if (n==10):
            break

    try:
        final_keywords = sh_keyword.keywords(texts)
    except:
        final_keywords = " "

    keywords.append(final_keywords)

    data = {'title': titles, 'text': texts, 'word': words, 'link': links, 'keywords':keywords}
    data_frame = pd.DataFrame(data, columns=['title', 'text', 'word', 'link'])

    file_name = '구글뉴스_{}_{}'.format(search_word, date)

    data_frame.to_csv('/home/ubuntu/django-project/crawling/result/' + file_name + '.csv')
    data_frame.to_excel('/home/ubuntu/django-project/crawling/result/' + file_name + '.xlsx')

    folder_path = '/home/ubuntu/django-project/crawling/result'

    print('저장 완료 | 경로 : {}\\{}'.format(folder_path, file_name))

    print(data)

    return data
