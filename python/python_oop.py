# 파이썬 객체 지향 프로그래밍(OOP)


class Car():
    def __init__(self, company, details):
        self._company = company
        self._details = details

    def __str__(self):
        return 'str : {} - {}'.format(self._company, self._details)

    def __repr__(self):
        return 'repr : {} - {}'.format(self._company, self._details)

car1 = Car('Ferrai', {'color' : 'White', 'horsepower':400, 'price': 8000})

print(car1.__dict__)
print(dir(car1))