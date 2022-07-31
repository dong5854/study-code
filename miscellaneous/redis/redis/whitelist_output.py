import json
import redis

# 레디스 연결
rd = redis.StrictRedis(host='localhost', port=9000, db=0)

whitelist = rd.lrange("username", 0 , -1)

for i in whitelist:
    print(i.decode('utf-8'))