import os
import requests
from bs4 import BeautifulSoup
from pandas import DataFrame
from datetime import datetime

def Naver_News(search_word,sort):
    # 현재 시간 저장 - 파일 이름 생성
    date = str(datetime.now())
    date = date[:date.rfind(':')].replace(' ', '_')
    date = date.replace(':', '시') + '분'

    # 탐색할 페이지 수 지정
    cur_page = 1
    # 현재 뉴스의 번호
    idx = 0

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
    # 뉴스 작성 시간 저장할 리스트
    when_write = []
    #print('네이버 뉴스에서 검색할 단어를 입력하세요.')
    search_word = search_word

    # 정렬 방식 - 관련도 순, 오래된 순, 최신순
    #print('뉴스 기사 정렬 방식 선택 (0. 관련도 순 1. 최신순 2. 오래된 순)')
    sort = sort

    url = f'https://m.search.naver.com/search.naver?where=m_news&query={search_word}&sm=mtb_opt&sort={sort}&photo=0&field=0&pd=0&ds=&de=&docid=&related=0&mynews=0&office_type=0&office_section_code=0&news_office_checked=&nso=so%3Ar%2Cp%3Aall&is_sug_officeid=0'

    while cur_page <= 5:
        req = requests.get(url)
        html = req.text
        soup = BeautifulSoup(html, 'html.parser')
        search_result = soup.select_one('#news_result_list')

        news_links = search_result.select('.bx > .news_wrap > a')
        summarys_links = search_result.select('.bx > .news_wrap > .news_dsc > .dsc_wrap > a')
        who_write_links = search_result.select('.bx > .news_wrap > .news_info > .info_group > a')
        when_write_links = search_result.select('.bx > .news_wrap > .news_info > .info_group > .info')

        for title in news_links:
            titles.append(title.get_text())
            idx += 1
        # print(titles)

        for summary in summarys_links:
            summarys.append(summary.get_text())
        # print(summarys)

        for who in who_write_links:
            except_who = "언론사 선정" in who.get_text()
            if except_who:
                who = who.get_text().replace("언론사 선정", "")
                who_write.append(who)
            else:
                who_write.append(who.get_text())
        # print(who_write)
        for when in when_write_links:
            if((when.get_text())[0].isnumeric()):
                when_write.append(when.get_text())
        for href in news_links:
            links.append(href.get('href'))

        cur_page += 1
        cur_url = 3 * cur_page + 1

        if(cur_page != 1):
            url = f'https://m.search.naver.com/search.naver?where=m_news&sm=mtb_pge&query={search_word}&sort={sort}&photo=0&field=0&pd=0&ds=&de=&cluster_rank=19&mynews=0&office_type=0&office_section_code=0&news_office_checked=&nso=so:r,p:all&start={cur_url}'


    #print('------------------------------------------------')

    for i in range(len(titles)):
        db.append([titles[i], summarys[i], who_write[i], links[i]])
        #print(db[i])

    # 모든 리스트 딕셔너리 형태로 저장
    result = {"title": titles, "summary": summarys, "who": who_write, "link": links, "created_at": when_write}

    print('크롤링 완료')

    print('데이터프레임 변환')
    news_df = DataFrame(result).T

    folder_path = os.getcwd()
    xlsx_file_name = '네이버뉴스_{}_{}.xlsx'.format(search_word, date)

    news_df.to_excel(xlsx_file_name)

    print('엑셀 저장 완료 | 경로 : {}\\{}'.format(folder_path, xlsx_file_name))
    #os.startfile(folder_path)

    return result