# 파이썬 객체 지향 프로그래밍(OOP)


class Car():
    """
    Car class
    Author : Lee
    Date:2023.12.21
    """
    def __init__(self, company, details):
        self._company = company
        self._details = details

    def __str__(self):
        return 'str : {} - {}'.format(self._company, self._details)

    def __repr__(self):
        return 'repr : {} - {}'.format(self._company, self._details)

    def detail_info(self):
        print('Current ID : {}'.format(id(self)))
        print('Car Detail Info : {} {}'.format(self._company, self._details.get('price')))

car = Car('HyunDai', {'color' : 'White', 'horsepower':200, 'price': 3000})
print(car.__dict__)
print(dir(car))


# self 의미
car1 = Car('Ferrai', {'color' : 'White', 'horsepower':400, 'price': 8000})
car2 = Car('Bmw', {'color' : 'Black', 'horsepower':270, 'price': 5000})
car3 = Car('Audi', {'color' : 'Silver', 'horsepower':300, 'price': 6000})


# ID 확인 
print(id(car1))
print(id(car2))
print(id(car3))

print(car1._company == car2._company)
print(car1 is car2)

# dir & __dict__ 확인
print(dir(car1))
print(dir(car2))

print()
print()

print(car1.__dict__)
print(car2.__dict__)

# Docstring
print(Car.__doc__)


# 실행
car1.detail_info()
car2.detail_info()

# 비교
print(car1.__class__, car2.__class__)
print(id(car1.__class__), id(car2.__class__))