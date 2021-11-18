# 엑셀 변환 가능한 코드 - 제목과 url만 추출 가능해서 코드 수정ing

import requests
from pandas import DataFrame
from bs4 import BeautifulSoup
import re
from datetime import datetime
import os

# 현재 시간 저장 - 파일 이름 생성
date = str(datetime.now())
date = date[:date.rfind(':')].replace(' ', '_')
date = date.replace(':', '시') + '분'

query = input('네이버 뉴스에서의 검색 키워드를 입력하세요 : ')
news_num = int(input('총 필요한 뉴스기사 수를 입력해주세요(숫자만 입력) : '))
query = query.replace(' ', '+')

news_url = 'https://search.naver.com/search.naver?where=news&sm=tab_jum&query={}'

req = requests.get(news_url.format(query))
soup = BeautifulSoup(req.text, 'html.parser')
search_result = soup.select_one('#news_result_list')

# 뉴스 기사 정보를 저장할 딕셔너리 생성(key-번호, value-뉴스기사 정보)
news_dict = {}
# 현재 뉴스의 번호
idx = 0
# 네이버 뉴스 페이지 번호
cur_page = 1

print()
print('크롤링 중...')

while idx < news_num:
    # table: 뉴스 바운딩 박스
    table = soup.find('ul', {'class': 'list_news'})
    # li_list: 뉴스 바운딩 박스 안의 각 뉴스 기사
    li_list = table.find_all('li', {'id': re.compile('sp_nws.*')})
    # area_list: 뉴스 기사 안의 뉴스 제목, 본문이 담긴 태그
    area_list = [li.find('div', {'class': 'news_area'}) for li in li_list]
    # a_list: 각 뉴스기사 내부 title, URL 정보가 담긴 태그
    a_list = [area.find('a', {'class': 'news_tit'}) for area in area_list]
    # b_list: 각 뉴스기사의 신문사 정보, 시간이 담긴 태그
    b_list = [area.find('div', {'class': 'news_info'}) for area in area_list]

    for n in a_list[:min(len(a_list), news_num - idx)]:
        # news_dict: 뉴스 기사를 담는 딕셔너리 (key-뉴스 기사 번호, valus-뉴스 기사 title, summary, url, company를 key로 하는 딕셔너리)
        news_dict[idx] = {'title': n.get('title'),
                          'url': n.get('href')}
        idx += 1

    cur_page += 1

    pages = soup.find('div', {'class': 'sc_page_inner'})
    next_page_url = [p for p in pages.find_all('a') if p.text == str(cur_page)][0].get('href')

    req = requests.get('https://search.naver.com/search.naver' + next_page_url)
    soup = BeautifulSoup(req.text, 'html.parser')

print('크롤링 완료')

print(news_dict)

news_dict = {}
idx = 0
cur_page = 1

print()
print('크롤링 중...')

while idx < news_num:
    ### 네이버 뉴스 웹페이지 구성이 바뀌어 태그명, class 속성 값 등을 수정함(20210126) ###

    table = soup.find('ul', {'class': 'list_news'})
    li_list = table.find_all('li', {'id': re.compile('sp_nws.*')})
    area_list = [li.find('div', {'class': 'news_area'}) for li in li_list]
    a_list = [area.find('a', {'class': 'news_tit'}) for area in area_list]

    for n in a_list[:min(len(a_list), news_num - idx)]:
        news_dict[idx] = {'title': n.get('title'),
                          'url': n.get('href')}
        idx += 1

    cur_page += 1

    pages = soup.find('div', {'class': 'sc_page_inner'})
    next_page_url = [p for p in pages.find_all('a') if p.text == str(cur_page)][0].get('href')

    req = requests.get('https://search.naver.com/search.naver' + next_page_url)
    soup = BeautifulSoup(req.text, 'html.parser')

print('크롤링 완료')

print('데이터프레임 변환')
news_df = DataFrame(news_dict).T

folder_path = os.getcwd()
xlsx_file_name = '네이버뉴스_{}_{}.xlsx'.format(query, date)

news_df.to_excel(xlsx_file_name)

print('엑셀 저장 완료 | 경로 : {}\\{}'.format(folder_path, xlsx_file_name))
os.startfile(folder_path)