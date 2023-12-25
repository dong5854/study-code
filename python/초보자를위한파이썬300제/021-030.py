# 021
letters : str = 'python'
print(letters[0], letters[2])

# 022
license_plate : str = "24가 2210"
print(license_plate[-4:])

# 023
string : str = "홀짝홀짝홀짝"
print(string[::2])

# 024
string : str = "PYTHON"
print(string[::-1])

# 025
phone_number : str = "010-1111-2222"
print(phone_number.replace("-", " "))

# 026
phone_number : str = "010-1111-2222"
phone_number1 : str = phone_number.replace("-", " ")
print(phone_number1)

# 027
url : str = "http://sharedbook.kr"
print(url.split(".")[-1])

# 028
lang: str = 'python'
"""
TypeError: 'str' object does not support item assignment
lang[0] = 'P'
"""

# 029
string : str = "abcdfe2a354a32a"
string : str = string.replace('a', 'A')
print(string)

# 030
string : str = "abcd"
string.replace('a', 'A')
# 문자열은 변경할 수 없는 자료형이기에 그대로 출력된다.
print(string)