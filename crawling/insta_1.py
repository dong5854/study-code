from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from time import sleep

import time as time
import requests
import getpass
import urllib.request
import matplotlib.pyplot as plt

driver = webdriver.Chrome(r"/home/ubuntu/django-project/chromedriver")

loginUrl = f"https://www.instagram.com/accounts/login/"

driver.get(loginUrl)

# 화면 전체화면으로 키우기
driver.maximize_window()

# 인스타그램 로그인
# userId = getpass.getpass("ID: ")    # getpass는 input을 받을때 정보를 .....로 처리함
# userPw = getpass.getpass("PW: ")
userId = 'donggukice@gmail.com'
userPw = 'capstone'

hashTag = input("검색할 해쉬태그를 입력하세요: ")

# 인스타그램 창에서 로그인 공간 찾기
element_id = driver.find_element_by_name("username")
element_id.send_keys(userId)
element_password = driver.find_element_by_name("password")
element_password.send_keys(userPw)
sleep(1.5)

# 로그인 버튼 클릭
driver.find_element_by_css_selector('button.sqdOP.L3NKy.y3zKF').click()
sleep(3)
driver.implicitly_wait(20)

# 로그인 정보 저장 나중에 하기 버튼 클릭
driver.find_element_by_css_selector('button.sqdOP.yWX7d.y3zKF').click()
sleep(3)
# 알림 설정 나중에 하기 버튼 클릭
driver.find_element_by_css_selector('button.aOOlW.HoLwm').click()
sleep(3)

# 해시태그 검색하기
searchUrl = f"https://www.instagram.com/explore/tags/{hashTag}"
driver.get(searchUrl)
sleep(3)

# 데이터 저장할 Dictionary
insta_dict = {'id': [],
              'date': [],
              'like': [],
              'text': [],
              'hashtag': []}

# 첫번째 게시물 클릭
first_post = driver.find_element_by_class_name('eLAPa')

seq = 0
start = time.time()

while True:
    try:
        if driver.find_element_by_css_selector('a._65Bje.coreSpriteRightPaginationArrow'):
            if seq % 20 == 0:
                print('{}번째 수집 중'.format(seq), time.time() - start, sep='\t')

            ## id 정보 수집
            try:
                info_id = driver.find_element_by_css_selector('h2._6lAjh').text
                insta_dict['id'].append(info_id)
            except:
                info_id = driver.find_element_by_css_selector('div.C4VMK').text.split()[0]
                insta_dict['id'].append(info_id)

            ## 시간정보 수집
            time_raw = driver.find_element_by_css_selector('time.FH9sR.Nzb55')
            time_info = pd.to_datetime(time_raw.get_attribute('datetime')).normalize()
            insta_dict['date'].append(time_info)

            ## like 정보 수집
            try:
                driver.find_element_by_css_selector('button.sqdOP.yWX7d._8A5w5')
                like = driver.find_element_by_css_selector('button.sqdOP.yWX7d._8A5w5').text
                insta_dict['like'].append(like)

            except:
                insta_dict['like'].append('영상')

            ##text 정보수집
            raw_info = driver.find_element_by_css_selector('div.C4VMK').text.split()
            text = []
            for i in range(len(raw_info)):
                ## 첫번째 text는 아이디니까 제외
                if i == 0:
                    pass
                ## 두번째부터 시작
                else:
                    if '#' in raw_info[i]:
                        pass
                    else:
                        text.append(raw_info[i])
            clean_text = ' '.join(text)
            insta_dict['text'].append(clean_text)

            ##hashtag 수집
            raw_tags = driver.find_elements_by_css_selector('a.xil3i')
            hash_tag = []
            for i in range(len(raw_tags)):
                if raw_tags[i].text == '':
                    pass
                else:
                    hash_tag.append(raw_tags[i].text)

            insta_dict['hashtag'].append(hash_tag)

            seq += 1

            # 100개의 게시물 크롤링
            if seq == 100:
                break

            driver.find_element_by_css_selector('a._65Bje.coreSpriteRightPaginationArrow').click()
            time.sleep(1.5)


        else:
            break

    except:
        driver.find_element_by_css_selector('a._65Bje.coreSpriteRightPaginationArrow').click()
        time.sleep(2)

test = pd.DataFrame.from_dict(insta_dict)
test.head()

print()