from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics, status
from .serializers import CrawlSerializer, UserSerializer
from .models import Crawled, User
from rest_framework.views import APIView
from rest_framework.response import Response

from api import serializers
from crawling.NaverNews import Naver_News
from crawling.GoogleNews_final import Google_News
from crawling.Danawa import Danawa
from crawling.DaumNews import Daum_News
from machinelearning.S_machine import sentiment_predict
from crawling.key.sh_keyword import keywords
import psycopg2
import datetime as dt
import re

def reset_crawl_data():
    conn_string = "host='localhost' dbname ='d_database' user='d_user' password='dash1234'"
    conn = psycopg2.connect(conn_string)

    cur = conn.cursor()
    cur.execute("DELETE FROM api_crawled;")
    conn.commit()

    cur.close()
    conn.close()

# Create your views here.

#API 관련 코드가 들어갈 부분
def main(request):
    return HttpResponse("Hello")

class Procon(APIView):
    serializer_class = CrawlSerializer

    def post(self,request, foramt=None):

        data = request.data["data"]
        pro_list = []
        con_list = []

        for i in range(len(data)):
            description = data[i]['description']
            good_or_bad, score = sentiment_predict(description)
            if good_or_bad == "good":
                pro_list.append(data[i])
            elif good_or_bad == "bad":
                con_list.append(data[i])

        send_data = {'pro_list' : pro_list, 'con_list' : con_list}
        return Response(send_data, status=status.HTTP_200_OK) 


class Analysis(APIView):
    serializer_class = CrawlSerializer
    
    def post(self,request, format=None):
        data = request.data["data"] 
        good_cnt = 0
        bad_cnt = 0
        good_list = []
        bad_list = []
        good_word_list = []
        bad_word_list = []
        for i in range(len(data)): # data의 개수 만큼 반복
            list = []
            description = data[i]['description']
            good_or_bad, score = sentiment_predict(description)
            if good_or_bad == "good":
                good_cnt += 1
                good_list.append(description)
            elif good_or_bad =="bad":
                bad_cnt += 1
                bad_list.append(description)
        good_words = keywords(good_list)
        bad_words = keywords(bad_list)
        for i in good_words:
            good_word_list.append(i)
        for i in bad_words:
            bad_word_list.append(i)

        send_data = {'good_cnt' : good_cnt, 'bad_cnt' : bad_cnt, 'good_word_list' : good_word_list, 'bad_word_list' : bad_word_list}
        print(send_data)
        return Response(send_data, status=status.HTTP_200_OK) 
            
class Login(APIView):
    serializer_class = UserSerializer

    def post(self,request, format=None):
        id = request.data["email"]
        pwd = request.data["password"]
        conn_string = "host='localhost' dbname ='d_database' user='d_user' password='dash1234'"
        conn = psycopg2.connect(conn_string)
        cur = conn.cursor()
        cur.execute("SELECT * FROM api_user WHERE user_id = " + "\'" + id + "\' and user_pwd = " 
        +  "\'" + pwd + "\'" + ";")
        data_login = cur.fetchall()
        cur.execute("SELECT * FROM api_user WHERE user_id = " + "\'" + id + "\'" + ";")
        data_id = cur.fetchall()
        conn.commit()
        cur.close()
        conn.close()

        if data_login != []:
            result = {'success':'Login success'}
            return Response(result,status=status.HTTP_200_OK)
        elif data_id != []:
            result = {'success':'Login fail, Wrong password'}
            return Response(result, status=status.HTTP_200_OK)
        else:
            result = {'success':'Login fail'}
            return Response(result, status=status.HTTP_200_OK)

class CreateUser(APIView):
    serializer_class = UserSerializer

    def post(self,request, format=None):
        id = request.data["email"]
        pwd = request.data["password"]
        name_first = request.data["name_first"]
        name_last = request.data["name_last"]

        conn_string = "host='localhost' dbname ='d_database' user='d_user' password='dash1234'"
        conn = psycopg2.connect(conn_string)
        cur = conn.cursor()
        cur.execute("SELECT * FROM api_user WHERE user_id = " + "\'" + id + "\'" + ";")
        data = cur.fetchall()
        conn.commit()
        cur.close()
        conn.close()

        if data == []:
            user = User(user_id=id, user_pwd=pwd, user_name_first=name_first, user_name_last=name_last)
            user.save()
            json_form = {'user_id':id,'user_pwd':pwd,'user_name_first':name_first,'user_name_last:':name_last,'success':True}
            return Response(json_form,status=status.HTTP_200_OK)
        else:
            json_form = {'user_id':id,'user_pwd':pwd,'user_name_first':name_first,'user_name_last:':name_last,'success':False}
            return Response(json_form,status=status.HTTP_200_OK)
class ConnectCrawl(APIView):
    serializer_class = CrawlSerializer
    
    def post(self, request, format=None):
        reset_crawl_data()
        keyword = request.data["keyword"]
        #keyword = '시진핑'
        sort = '0' #frontend에서 sort가 있을 경우 sort 유형 받아오기
        engine = request.data["engine"]
        #engine = "네이버뉴스"
        print("keyword : " + keyword + " , engine : " + engine)

        
        if keyword != None:
            
            if engine == "구글뉴스": # 검색 엔진이 Google일 경우
                Dict_Google_News = Google_News(keyword)
                json_form = [0 for i in range(len(Dict_Google_News['title']))]
                for i in range(len(Dict_Google_News['title'])):
                    title = list(Dict_Google_News['title'])[i]
                    text = list(Dict_Google_News['text'])[i]
                    texts = ""
                    for x in text:
                        texts = texts + x
                    #print("text : " + text)
                    print("------------------------------------------------------------------------")
                    print(texts)
                    link = list(Dict_Google_News['link'])[i]
                    word = list(Dict_Google_News['word'])[i]
                    
                    json_form[i] = {'id':i+1, 'keyword':keyword, 'engine':"Google", 'title':title, 
                    'text':texts, 'url':link, 'like':None, 'created_at':None, 'word': word}
                    
                    crawled = Crawled(id=i+1,keyword=keyword,engine="Google",title=title,text=texts,url=link
                    ,recommendation=None, created_at=None, words = word)
                    crawled.save()
                return Response(json_form, status=status.HTTP_200_OK) 

            elif engine == "네이버뉴스": # 검색 엔진이 Naver일 경우
                Dict_Naver_News = Naver_News(keyword,sort)
                json_form = [0 for i in range(len(Dict_Naver_News['title']))]
                for i in range(len(Dict_Naver_News['title'])):
                    title = list(Dict_Naver_News['title'])[i]
                    summary = list(Dict_Naver_News['summary'])[i]
                    who = list(Dict_Naver_News['who'])[i]
                    link = list(Dict_Naver_News['link'])[i]
                    created_at = list(Dict_Naver_News['created_at'])[i]
                    
                    if ("전" in created_at):
                        year = int(dt.datetime.now().strftime("%Y"))
                        month = int(dt.datetime.now().strftime("%M"))
                        day = int(dt.datetime.now().strftime("%d"))
                        current_time = dt.datetime.now()
                        if ("일" in created_at):
                            cal_time = current_time - dt.timedelta(days=int(re.sub(r'[^0-9]', '', created_at)))
                        elif ("시간" in created_at):
                            cal_time = current_time - dt.timedelta(hours=int(re.sub(r'[^0-9]', '', created_at)))
                        else: #("분" in created_at)
                            cal_time = current_time - dt.timedelta(minutes=int(re.sub(r'[^0-9]', '', created_at)))

                        created_at = cal_time.strftime("%Y-%m-%d")

                    else:
                        year, month, day, nothing = created_at.split('.')
                        created_at = year + "-" + month + "-" + day

                    json_form[i] = {'id':i+1, 'keyword':keyword, 'engine':"Naver", 'title':title, 
                    'text':summary, 'who':who, 'url':link, 'like':None, 'created_at':created_at, 'words':None}

                    crawled = Crawled(id=i+1,keyword=keyword,engine="Naver",title=title,text=summary,who=who,url=link
                    ,recommendation=None, created_at=created_at, words=None)
                    crawled.save()
                print(json_form)
                return Response(json_form, status=status.HTTP_200_OK)

            elif engine == "다나와": # 검색 엔진이 Danawa일 경우
                Dict_Danawa = Danawa(keyword)
                json_form = [0 for i in range(len(Dict_Danawa['prod_tit']))]
                for i in range(len(Dict_Danawa['prod_tit'])):
                    print(i)
                    prod_tit = list(Dict_Danawa['prod_tit'])[i]
                    print("prod_tit : " + prod_tit)
                    url = list(Dict_Danawa['url'])[i]
                    print("url : " + url)
                    date = list(Dict_Danawa['date'])[i]
                    year, month, day, nothing = date.split('.')
                    date = year + "-" + month + "-" + day
                    print("date : " + date)
                    mall = list(Dict_Danawa['mall'])[i]
                    print("mall : " + mall)
                    star_mask = list(Dict_Danawa['star_mask'])[i]
                    star_mask = int(star_mask.replace("점",""))
                    print("star_mask : " + str(star_mask))
                    atc = list(Dict_Danawa['atc'])[i]
                    print("atc : " + atc)

                    json_form[i] = {'id':i+1, 'keyword':keyword, 'engine':"Danawa", 'title':mall+"-"+prod_tit,
                    'url':url, 'created_at':date, 'like':star_mask, 'text':atc, 'words':None}

                    crawled = Crawled(id=i+1,keyword=keyword,engine="Danawa",title=mall+"-"+prod_tit,text=atc
                    ,who=None,url=url,recommendation=star_mask, created_at=date, words=None)
                    crawled.save()
                return Response(json_form, status=status.HTTP_200_OK)

            elif engine == "다음뉴스":
                Dict_Daum = Daum_News(keyword)
                json_form = [0 for i in range(len(Dict_Daum['title']))]
                for i in range(len(Dict_Daum['title'])):
                    print(i)
                    title = list(Dict_Daum['title'])[i]
                    print("title : " + title)
                    summary = list(Dict_Daum['summary'])[i]
                    print("summary : " + summary)
                    who = list(Dict_Daum['who'])[i]
                    print("who : " + who)
                    created_at = list(Dict_Daum['when'])[i]

                    if ("전" in created_at):
                        year = int(dt.datetime.now().strftime("%Y"))
                        month = int(dt.datetime.now().strftime("%M"))
                        day = int(dt.datetime.now().strftime("%d"))
                        current_time = dt.datetime.now()
                        if ("일" in created_at):
                            cal_time = current_time - dt.timedelta(days=int(re.sub(r'[^0-9]', '', created_at)))
                        elif ("시간" in created_at):
                            cal_time = current_time - dt.timedelta(hours=int(re.sub(r'[^0-9]', '', created_at)))
                        else: #("분" in created_at)
                            cal_time = current_time - dt.timedelta(minutes=int(re.sub(r'[^0-9]', '', created_at)))

                        created_at = cal_time.strftime("%Y-%m-%d")

                    else:
                        year, month, day, nothing = created_at.split('.')
                        created_at = year + "-" + month + "-" + day

                    print("created_at : " + created_at)
                    link = list(Dict_Daum['link'])[i]
                    print("link : " + link)

                    json_form[i] = {'id':i+1, 'keyword':keyword, 'engine':"Daum", 'title':title,'who':who,
                    'url':link, 'created_at':created_at, 'like':None, 'text':summary, 'words':None}

                    crawled = Crawled(id=i+1,keyword=keyword,engine="Daum",title=title,text=summary
                    ,who=who,url=link,recommendation=None, created_at=created_at, words=None)
                    crawled.save()
                return Response(json_form, status=status.HTTP_200_OK)

        return Response({'Bad Request'}, status=status.HTTP_400_BAD_REQUEST)