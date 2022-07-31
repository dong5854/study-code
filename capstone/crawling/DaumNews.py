import requests
from bs4 import BeautifulSoup

import os
import pandas as pd
from pandas import DataFrame
from datetime import datetime

def Daum_News(keyword):
    # 현재 시간 저장 - 파일 이름 생성
    date = str(datetime.now())
    date = date[:date.rfind(':')].replace(' ', '_')
    date = date.replace(':', '시') + '분'

    # 탐색할 페이지 수 지정
    cur_page = 1

    # 모든 리스트 저장
    result = {}
    db = []

    # 뉴스 기사 제목들 저장할 리스트
    titles = []
    # 뉴스 기사 요약들 저장할 리스트
    summarys = []
    # 뉴스 신문사 저장할 리스트
    who_write = []
    # 뉴스 링크 저장할 리스트
    links = []
    # 뉴스 날짜 저장할 리스트
    when_write = []

    search_word = keyword

    # 정렬 방식 - 관련도 순, 오래된 순, 최신순
    sort = 0 

    url = f'https://m.search.daum.net/search?w=news&DA=STC&enc=utf8&cluster=y&cluster_page=1&q={search_word}&sort={sort}&p={cur_page}'

    while cur_page <= 5:
        req = requests.get(url)
        html = req.text
        soup = BeautifulSoup(html, 'html.parser')
        search_result = soup.select_one('.compo-itemlist')

        news_links= search_result.select('ul > li > .info_item > .tit-g.clamp-g2')
        summarys_links = search_result.select('ul > li > .info_item > .desc.clamp-g3')
        who_write_links = search_result.select('ul > li > .info_item > .area_writer > .compo-subinfo > .txt_info.clamp')
        when_write_links = search_result.select('ul > li > .info_item > .area_writer > .compo-subinfo > .txt_info')
        href_links = search_result.select('ul > li > .info_item')

        for title in news_links:
            titles.append(title.get_text())

        for summary in summarys_links:
            summarys.append(summary.get_text())

        for who in who_write_links:
            who_write.append(who.get_text())

        for when in when_write_links:
            if((when.get_text())[0].isnumeric()):
                when_write.append(when.get_text())

        for href in href_links:
            links.append(href.get('href'))

        cur_page += 1

        if(cur_page != 1):
            url = f'https://m.search.daum.net/search?w=news&DA=STC&enc=utf8&cluster=y&cluster_page=1&q={search_word}&sort={sort}&p={cur_page}'

    print(when_write)
    result = {"title": titles, "summary": summarys, "who": who_write, "when": when_write, "link": links}

    print('크롤링 완료')

    print('데이터프레임 변환')
    news_df = DataFrame(result).T

    folder_path = os.getcwd()
    xlsx_file_name = '다음뉴스_{}_{}.xlsx'.format(search_word, date)
    news_df.to_excel(xlsx_file_name)

    print('엑셀 저장 완료 | 경로 : {}\\{}'.format(folder_path, xlsx_file_name))

    return result