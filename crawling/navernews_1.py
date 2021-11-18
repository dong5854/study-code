import requests
from bs4 import BeautifulSoup
import time

# 탐색할 페이지 수 지정

# 뉴스 기사 제목들 저장할 리스트
titles = []
# 뉴스 기사 요약들 저장할 리스트
summarys = []
# 뉴스 신문사 저장할 리스트
who_write = []
# 뉴스 링크 저장할 리스트
links = []

# 모든 리스트 저장
result = {}
db = []

print('네이버 뉴스에서 검색할 단어를 입력하세요.')
search_word = input()

# 정렬 방식 - 관련도 순, 오래된 순, 최신순
print('뉴스 기사 정렬 방식 선택 (0. 관련도 순 1. 최신순 2. 오래된 순)')
sort = input()

url = f'https://m.search.naver.com/search.naver?where=m_news&query={search_word}&sm=mtb_opt&sort={sort}&photo=0&field=0&pd=0&ds=&de=&docid=&related=0&mynews=0&office_type=0&office_section_code=0&news_office_checked=&nso=so%3Ar%2Cp%3Aall&is_sug_officeid=0'

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
#print(titles)

for summary in summarys_links:
    summarys.append(summary.get_text())
#print(summarys)

for who in who_write_links:
    except_who = "언론사 선정" in who.get_text()
    if except_who:
        who = who.get_text().replace("언론사 선정", "")
        who_write.append(who)
    else:
        who_write.append(who.get_text())
#print(who_write)



#print('------------------------------------------------')

for i in range(len(titles)):
    db.append([titles[i], summarys[i], who_write[i]])
    print(db[i])
# 모든 리스트 딕셔너리 형태로 저장
result = {"title": titles, "summary": summarys, "who": who_write}