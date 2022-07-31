import time
import re
from datetime import datetime

import pandas as pd
from selenium import webdriver
from selenium.common.exceptions import NoSuchElementException, TimeoutException
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from bs4 import BeautifulSoup
from pandas import DataFrame

# 현재 시간 저장 - 파일 이름 생성
file_date = str(datetime.now())
file_date = file_date[:file_date.rfind(':')].replace(' ', '_')
file_date = file_date.replace(':', '시') + '분'

options = webdriver.ChromeOptions()
options.headless = True
options.add_argument('window-size=1920x1080')
options.add_argument("disable-gpu")
options.add_argument(
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.70 Safari/537.36")

# 웹드라이버 호출
driver = webdriver.Chrome(r'/home/ubuntu/django-project/chromedriver', options=options)

html = driver.page_source
soup = BeautifulSoup(html, 'lxml')

Url_login = f'https://www.instagram.com/accounts/login/'
#Url_login = f'https://www.instagram.com/?hl=ko'

driver.get(Url_login)
#time.sleep(5)

# 로그인 정보
user_id = 'donggukice@gmail.com'
#user_id = 'okzlv2@gmail.com'
user_pw = 'capstone'
#user_pw = 'okokokS2'

# 검색 정보
search_word = input("인스타그램에서 검색할 단어를 입력하세요.")
search_post = 50
cur_post = 0

# 인스타그램 창에서 로그인 하기
#driver.find_element(By.XPATH, '//*[@id="loginForm"]/div/div[1]/div/label/input').send_keys(user_id)
#driver.find_element(By.XPATH, '//*[@id="loginForm"]/div/div[2]/div/label/input').send_keys(user_pw)
#driver.find_element(By.XPATH, '//*[@id="loginForm"]/div/div[3]').click()

try:
    element = WebDriverWait(driver, 30).until(
        EC.presence_of_element_located((By.NAME, 'username'))
    )
except TimeoutException:
    print("time out, can\'t find id section")
    element=None
finally:
    if(element !=None):
        element.send_keys(user_id)

try:
    element = WebDriverWait(driver, 30).until(
        EC.presence_of_element_located((By.NAME, 'password'))
    )
except TimeoutException:
    print("time out, can\'t find password section")
    element=None
finally:
    if(element !=None):
        element.send_keys(user_pw)
        
#driver.find_element_by_class_name('qF0y9.Igw0E.IwRSH.eGOV_._4EzTm.bkEs3.CovQj.jKUp7.DhRcB').send_keys(Keys.ENTER)
#qF0y9.Igw0E.IwRSH.eGOV_._4EzTm

#driver.find_element_by_xpath('//*[@id="loginForm"]/div/div[3]').click()
#driver.find_element_by_css_selector('loginForm > div.qF0y9.Igw0E.IwRSH.eGOV_._4EzTm.kEKum > div:nth-child(3) > button > div').click()

try:
    element = WebDriverWait(driver, 30).until(
        EC.presence_of_element_located((By.XPATH, '//*[@id="loginForm"]/div/div[3]'))
    )
except TimeoutException:
    print("time out")
    element=None
finally:
    if(element !=None):
        element.click()

# 로그인 정보 저장 나중에 하기 버튼 클릭
try:
    element = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.CSS_SELECTOR, 'button.sqdOP.yWX7d.y3zKF'))
    )
except TimeoutException:
    print("time out")
    element=None
finally:
    if(element !=None):
        element.click()
# 알림 설정 나중에 하기 버튼 클릭
try: 
    element = WebDriverWait(driver, 5).until(
        EC.presence_of_element_located((By.CSS_SELECTOR, 'button.aOOlW.HoLwm'))
    )
except TimeoutException:
    print("time out, no alarm later button")
    element=None
finally:
    if(element !=None):
        element.click()

# 해시태그 검색하기
searchUrl = f"https://www.instagram.com/explore/tags/{search_word}"
driver.get(searchUrl)
#time.sleep(5)

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

time.sleep(3)
# 제일 상단 게시물 클릭하기

element = None
while element == None:
    try: 
        element = WebDriverWait(driver, 5).until(
            EC.presence_of_element_located((By.XPATH, '//*[@id="react-root"]/section/main/article/div[1]/div/div/div[1]/div[1]/a/div[1]/div[2]'))
        )
    except TimeoutException:
        print("time out, No posts")
        element=None
    finally:
        if(element !=None):
            element.click() 


#first_post = driver.find_element_by_class_name('eLAPa').click()
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
            #text = soup.select('div.C4VMK > span')[0].text
            textss = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CSS_SELECTOR, 'body > div._2dDPU.QPGbb.CkGkG > div._32yJO > div > article > div > div.HP0qD > div > div > div.eo2As > div.EtaWk > ul > div > li > div > div > div.C4VMK > span')))
            text = textss.text
            #text = driver.find_element_by_css_selector(
                #'body > div._2dDPU.QPGbb.CkGkG > div._32yJO > div > article > div > div.HP0qD > div > div > div.eo2As > div.EtaWk > ul > div > li > div > div > div.C4VMK > span').text
        except :
            text = ''
            #text = driver.find_element_by_xpath('/html/body/div[6]/div[2]/div/article/div/div[2]/div/div/div[2]/div[1]/ul/div/li/div/div/div[2]/span')
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

        try:
            like = driver.find_element_by_css_selector(
                'body > div._2dDPU.QPGbb.CkGkG > div._32yJO > div > article > div > div.HP0qD > div > div > div.eo2As > section.EDfFK.ygqzn > div > div > a > span').text
        except:
            like = 0

        likes.append(like)

        # 태그 수집

        try:
            data = driver.find_element_by_css_selector('.C7I1f.X7jCj')
            tag_raw = data.text
            tag = re.findall('#[A-Za-z0-9가-힣]+', tag_raw)
            tag = ''.join(tag).replace("#", " ")  # "#" 제거
            tags.append(tag.split())
        except:
            tag = ''
            tags.append(tag)


        cur_post += 1

        if(cur_post > search_post):
            break
        time.sleep(5)

        try:
            # 최대 30초까지 기다렸다가, > 모양 클릭하여 다음 게시물로 넘어가기
            # WebDriverWait(driver,30).until(EC.presence_of_element_located((By.CSS_SELECTOR, 'a._65Bje.coreSpriteRightPaginationArrow')))
            # driver.find_element_by_css_selector('a._65Bje.coreSpriteRightPaginationArrow').click()
            n=0
            while(n<2):
                nextIcon = driver.find_element_by_xpath('/html/body/div[6]/div[1]/div/div/div[2]/button')
                nextIcon.click()
                n += 1
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