import time
import re
from datetime import datetime

import pandas as pd
from selenium import webdriver
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from bs4 import BeautifulSoup
from pandas import DataFrame

# 현재 시간 저장 - 파일 이름 생성
file_date = str(datetime.now())
file_date = file_date[:file_date.rfind(':')].replace(' ', '_')
file_date = file_date.replace(':', '시') + '분'

chrome_options = webdriver.ChromeOptions()
chrome_options.headless = True
chrome_options.add_argument('--headless')
chrome_options.add_argument('--no-sandbox')
chrome_options.add_argument('--disable-dev-shm-usage')

driver = webdriver.Chrome(executable_path='/home/ubuntu/django-project/chromedriver',chrome_options=chrome_options)

Url_login = f'https://www.instagram.com/accounts/login/'
#Url_login = f'https://www.instagram.com/?hl=ko'

driver.get(Url_login)
time.sleep(5)

html = driver.page_source
soup = BeautifulSoup(html, 'lxml')

# 로그인 정보
user_id = 'winwin3306@naver.com'
user_pw = 'capstone'
#
# 검색 정보
search_word = input("인스타그램에서 검색할 단어를 입력하세요.")
search_post = 10
cur_post = 0

# 인스타그램 창에서 로그인 하기
#driver.find_element(By.XPATH, '//*[@id="loginForm"]/div/div[1]/div/label/input').send_keys(user_id)
#driver.find_element(By.XPATH, '//*[@id="loginForm"]/div/div[2]/div/label/input').send_keys(user_pw)
#driver.find_element(By.XPATH, '//*[@id="loginForm"]/div/div[3]').click()

driver.find_element_by_name('username').send_keys(user_id)
driver.find_element_by_name('password').send_keys(user_pw)
time.sleep(3)
#driver.find_element_by_class_name('qF0y9.Igw0E.IwRSH.eGOV_._4EzTm.bkEs3.CovQj.jKUp7.DhRcB').send_keys(Keys.ENTER)
#qF0y9.Igw0E.IwRSH.eGOV_._4EzTm
n = 0
while(n <3):
    driver.find_element_by_xpath('//*[@id="loginForm"]/div/div[3]').click()
    n += 1
time.sleep(3)

# 로그인 정보 저장 나중에 하기 버튼 클릭
driver.find_element_by_xpath('//*[@id="react-root"]/section/main/div/div/div/div/button').click()
time.sleep(3)
# 알림 설정 나중에 하기 버튼 클릭
#driver.find_element_by_css_selector('button.aOOlW.HoLwm').click()
#time.sleep(3)

# 해시태그 검색하기
searchUrl = f"https://www.instagram.com/explore/tags/{search_word}"
driver.get(searchUrl)
time.sleep(5)

# 아이디 저장할 리스트
ids = []
# 본문 저장할 리스트
texts = []
# 태그 저장할 리스트
tags = []
# 좋아요 수 저장할 리스트
likes = []
# 날짜 저장할 리스트
dates = []


# 제일 상단 게시물 클릭하기
first_post = driver.find_element_by_class_name('eLAPa').click()
time.sleep(5)

while True:
    try:
        driver.implicitly_wait(5)

        # 아이디 수집
        id = driver.find_element_by_class_name('sqdOP.yWX7d._8A5w5.ZIAjV').text
        ids.append(id)



        # 본문 수집
        time.sleep(1)
        try:
            text = soup.select('div.C4VMK > span')[0].text
        except:
            text = ''


        # try:
        #     textss = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CSS_SELECTOR, 'body > div._2dDPU.QPGbb.CkGkG > div._32yJO > div > article > div > div.HP0qD > div > div > div.eo2As > div.EtaWk > ul > div > li > div > div > div.C4VMK > span')))
        #     text = textss.text
        #     #text = driver.find_element_by_css_selector(
        #         #'body > div._2dDPU.QPGbb.CkGkG > div._32yJO > div > article > div > div.HP0qD > div > div > div.eo2As > div.EtaWk > ul > div > li > div > div > div.C4VMK > span').text
        # except NoSuchElementException:
        #    break

        texts.append(text)


        # 시간 수집
        date = driver.find_element_by_css_selector('time.FH9sR.Nzb55').text

        # 시간 데이터 변환
        if date.find('시간') != -1 or date.find('일') != -1 or date.find('분') != -1:
            date_text = '0주'  # 날짜가 시간, 일, 분 단위일 경우 0주로 변환해서 출력
        else:
            date_text = date
        dates.append(date_text)

        # 좋아요 수집
        like = driver.find_element_by_css_selector('body > div._2dDPU.QPGbb.CkGkG > div._32yJO > div > article > div > div.HP0qD > div > div > div.eo2As > section.EDfFK.ygqzn > div > div > a > span').text
        likes.append(like)

        # 태그 수집
        data = driver.find_element_by_css_selector('.C7I1f.X7jCj')
        tag_raw = data.text
        tag = re.findall('#[A-Za-z0-9가-힣]+', tag_raw)
        tag = ''.join(tag).replace("#", " ")  # "#" 제거

        tags.append(tag.split())

        cur_post += 1

        if(cur_post > search_post):
            break
        time.sleep(5)


        try:
            # 최대 30초까지 기다렸다가, > 모양 클릭하여 다음 게시물로 넘어가기
            # WebDriverWait(driver,30).until(EC.presence_of_element_located((By.CSS_SELECTOR, 'a._65Bje.coreSpriteRightPaginationArrow')))
            # driver.find_element_by_css_selector('a._65Bje.coreSpriteRightPaginationArrow').click()
            nextIcon = driver.find_element_by_css_selector(
                "body > div._2dDPU.QPGbb.CkGkG > div.EfHg9 > div > div > div.l8mY4.feth3 > button > div > span > svg")
            nextIcon.click()
            time.sleep(3)
        except NoSuchElementException:
            time.sleep(3)
            pass

    except ValueError:
        cur_post -= 1
        pass
        time.sleep(3)


    data = {"id" : ids, "text": texts, "like": likes, "date": dates, "tag":tags}
    data_frame = pd.DataFrame(data, columns=['id', 'text', 'like', 'date', 'tag'])


folder_path = './result'
xlsx_file_name = '인스타_{}_{}.xlsx'.format(search_word, file_date)

data_frame.to_excel('./result' + xlsx_file_name)

print('엑셀 저장 완료 | 경로 : {}\\{}'.format(folder_path, xlsx_file_name))
