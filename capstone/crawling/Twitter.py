import re
import csv
import time
import requests
import pandas as pd
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions
from selenium.common import exceptions
from bs4 import BeautifulSoup as bs
from datetime import datetime as dt

# 현재 시간 저장 - 파일 이름 생성
date = str(dt.now())
date = date[:date.rfind(':')].replace(' ', '_')
date = date.replace(':', '시') + '분'

# 검색어 입력
search_word = input("트위터에서 검색할 단어를 입력하세요.")
min_retweets = 5

chrome_options = webdriver.ChromeOptions()


chrome_options.add_argument('--no-sandbox')

chrome_options.add_argument('--disable-dev-shm-usage')

driver = webdriver.Chrome('/home/ubuntu/django-project/chromedriver',chrome_options=chrome_options)
language = "ko"
filepath= './'

url= f'https://mobile.twitter.com/search?q={search_word}%20min_retweets%3A{min_retweets}&src=typed_query&f=top'

driver.get(url)
time.sleep(1)

# 탐색할 트윗 수 지정
tweet_num = 50

def save_tweet_data_to_csv(records, filepath, mode='a+'):
    header = ['User', 'Handle', 'PostDate', 'TweetText', 'ReplyCount', 'RetweetCount', 'LikeCount']
    with open(filepath, mode=mode, newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        if mode == 'w':
            writer.writerow(header)
        if records:
            writer.writerow(records)

def collect_tweets(driver, tweet_num):
    page_cards = driver.find_elements_by_xpath('//div[@data-testid="tweet"]')
    for card in page_cards:
        cur_num = 1
        try:
            if(cur_num == tweet_num):
                break
            tweet = data_from_tweets(card)
            cur_num += 1
        except exceptions.StaleElementReferenceException:
            continue
        if not tweet:
            continue

def data_from_tweets(card):
    try:
        user = card.find_element_by_xpath('.//span').text
    except exceptions.NoSuchElementException:
        user = ""
    except exceptions.StaleElementReferenceException:
        return
    try:
        handle = card.find_element_by_xpath('.//span[contains(text(), "@")]').text
    except exceptions.NoSuchElementException:
        handle = ""
    try:
        postdate = card.find_element_by_xpath('.//time').get_attribute('datetime')
    except exceptions.NoSuchElementException:
        return
    try:
        _comment = card.find_element_by_xpath('.//div[2]/div[2]/div[1]').text
    except exceptions.NoSuchElementException:
        _comment = ""
    try:
        _responding = card.find_element_by_xpath('.//div[2]/div[2]/div[2]').text
    except exceptions.NoSuchElementException:
        _responding = ""
    tweet_text = _comment + _responding
    try:
        reply_count = card.find_element_by_xpath('.//div[@data-testid="reply"]').text
    except exceptions.NoSuchElementException:
        reply_count = ""
    try:
        retweet_count = card.find_element_by_xpath('.//div[@data-testid="retweet"]').text
    except exceptions.NoSuchElementException:
        retweet_count = ""
    try:
        like_count = card.find_element_by_xpath('.//div[@data-testid="like"]').text
    except exceptions.NoSuchElementException:
        like_count = ""

    tweet = (user, handle, postdate, tweet_text, reply_count, retweet_count, like_count)
    return tweet



def main():
    save_tweet_data_to_csv(None, filepath, 'w')  # create file for saving records
    cards = collect_tweets(driver)
    for card in cards:
        try:
            tweet = data_from_tweets(card)
        except exceptions.StaleElementReferenceException:
            continue
        if not tweet:
            continue
            tweet_id = generate_tweet_id(tweet)

    driver.quit()