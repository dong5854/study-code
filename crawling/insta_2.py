# 엑셀 변환 가능한 코드 - 유저 이름과 태그만 추출 가능해서 코드 수정ing

import requests
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

from time import sleep
import time as time
import getpass
import urllib.request
import random
import re

import pandas as pd
import numpy as np
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
count = input("크롤링할 게시물 수를 입력하세요: ")

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
sleep(5)

# 데이터 저장할 Dictionary
insta_dict = {'id': [],
              'date': [],
              'like': [],
              'text': [],
              'hashtag': []}

# 데이터 저장할 데이터프레임
insta_df = pd.DataFrame("", index = np.arange(1,1000), columns=["account","date", "like", "text", "hashtag", "t1", "t2", "t3", "t4", "t5", "t6", "t7", "t8", "t9", "t10" , "t11", "t12", "t13", "t14", "t15", "t16", "t17", "t18", "t19", "t20"])


# 맨 왼쪽 상단 첫 게시물 클릭
driver.find_element_by_css_selector('div.v1Nh3.kIKUG._bz0w').click()
time.sleep(3)

html = driver.page_source
soup = BeautifulSoup(html, 'html.parser')

# 데이터 기록, 다음 게시물로 클릭
for i in range(3):
    try:
        #account 데이터 기록
        account_data = driver.find_element_by_css_selector('a.sqdOP.yWX7d._8A5w5.ZIAjV')
        account_text = account_data.text


        # 날짜 기록
        date = driver.find_element_by_css_selector("time.FH9sR.Nzb55").text # 날짜 선택

        # 날짜 데이터가 시간, 일, 분 단위이면 0주로 변환
        if date.find('시간') != -1 or date.find('일') != -1 or date.find('분') != -1:
            date_text = '0주'
        else: date_text = date

        print(date_text)

        # 해쉬태그 데이터 기록
        data = driver.find_element_by_css_selector('.C7I1f.X7jCj')
        tag_raw = data.text
        tag = re.findall('#[A-Za-z0-9가-힣]+', tag_raw)
        tag = ''.join(tag).replace("#"," ") # "#" 제거

        tag_data = tag.split()

        print(tag_data)

        # 본문 기록
        content_result = soup.select_one('.XQXOT.qXf-y')
        content_linkes = content_result.select('.ZyFrc > .gElp9.rUo9f.PpGvg > .P9YgZ > .C7I1f.X7jCj > .C4VMK')

        text = []

        for content in content_linkes:
            text.append(content.get_text())
        print(text)
        # 좋아요 기록

    except:
        tag_data = "error"
        date_text = "error"


    try:
        # 최대 30초까지 기다렸다가, > 모양 클릭하여 다음 게시물로 넘어가기
        #WebDriverWait(driver,30).until(EC.presence_of_element_located((By.CSS_SELECTOR, 'a._65Bje.coreSpriteRightPaginationArrow')))
        #driver.find_element_by_css_selector('a._65Bje.coreSpriteRightPaginationArrow').click()
        nextIcon = driver.find_element_by_css_selector("body > div._2dDPU.QPGbb.CkGkG > div.EfHg9 > div > div > div.l8mY4.feth3 > button > div > span > svg")
        nextIcon.click()
    except:
        driver.close()

    time.sleep(5)
    if (i+1)%50 == 0 : print('{}, {}번째 게시물 탐색 완료'.format(time.strftime('%c', time.localtime(time.time())), i+1))

    # dataframe 저장
    insta_df.iloc[i, 0] = account_text
    insta_df.iloc[i, 1] = date_text

    for j in range(17):
        try:
            insta_df.iloc[i,j+2] = tag_data[j]
        except :
            break

    # 결과값 저장
    insta_df.to_excel("./results.xlsx")

# 크롬드라이버 종료
driver.close()