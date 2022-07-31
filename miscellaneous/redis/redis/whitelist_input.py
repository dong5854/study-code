# import requests
# response = requests.get('https://auth.useb.co.kr/users/chae@aklas.kr/whitelist')
# print(response.json())
import json
import redis

# 레디스 연결
rd = redis.StrictRedis(host='localhost', port=9000, db=0)

with open("sample.json", "r") as sample_json:
    sample_json = json.load(sample_json)
    whitelist = sample_json["data"]
    for i in whitelist:
        print(whitelist)
        ip = i['ip_addr']
        rd.lpush('username',ip)
        