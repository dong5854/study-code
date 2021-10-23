from django.http import HttpResponse

def main(request):
    return HttpResponse("메인페이지")