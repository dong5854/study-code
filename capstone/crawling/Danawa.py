from bs4 import BeautifulSoup
from selenium import webdriver
from time import sleep

def Danawa(keyword):
    options = webdriver.ChromeOptions()
    options.headless = True
    options.add_argument('window-size=1920x1080')
    options.add_argument("disable-gpu")
    options.add_argument(
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.70 Safari/537.36")

    # 웹드라이버 호출
    driver = webdriver.Chrome(r'/home/ubuntu/django-project/chromedriver', options=options) #크롬드라이버 사용 지정

    i = 0

    url ="http://www.danawa.com/"

    driver.get(url)
    driver.implicitly_wait(20)

    #검색창에 값 넣기
    searchKey = driver.find_element_by_css_selector("#AKCSearch")
    searchKey.send_keys(keyword)

    #검색 버튼 누르기
    searchIcon = driver.find_elements_by_css_selector("#srchFRM_TOP > fieldset > div.search__box.search_area_content > button")[i]
    searchIcon.click()

    #결과 기다리기
    driver.implicitly_wait(20)

    #제일 첫번째로 뜨는 상품 선택
    firstItem = driver.find_element_by_class_name("click_log_product_standard_title_")
    firstItem.click()

    #결과 기다리기
    driver.implicitly_wait(20)

    #상품을 선택하면 새탭으로 열리기 때문에 다음 탭으로 스위치
    driver.switch_to.window(driver.window_handles[1])

    #탭이 제대로 변경되었나 url확인
    print(driver.current_url)

    #상품 의견 섹션으로 들어가기
    reviews = driver.find_element_by_css_selector("#bookmark_cm_opinion_item")
    reviews.click()
    driver.implicitly_wait(20)

    #쇼핑몰 상품리뷰 탭 선택
    try:
        shopping = driver.find_element_by_id("danawa-prodBlog-productOpinion-button-tab-companyReview")
    except:
        shopping = driver.find_element_by_id("danawa-prodBlog-companyReview-button-tab-companyReview")
    shopping.click()

    #결과 기다리기
    driver.implicitly_wait(20)

    data=[]
    url = []
    date = []
    mall = []
    star_mask = []
    atc = []
    prod_tit = []
    n = 0
    while(True):
        # 페이지의 소스 가져오기
        req = driver.page_source

        #현재 페이지 파싱
        soup=BeautifulSoup(req, 'html.parser')
        #리뷰 리스트 뽑아오기
        review_list = soup.select(".danawa-prodBlog-companyReview-clazz-more")
        # print(review_list)
        
        for i in review_list:
            prod_tit.append(driver.find_element_by_class_name("prod_tit").get_attribute("innerHTML"))
            url.append(driver.current_url)
            date.append(i.select(".date")[0].get_text())
            mall.append(i.select(".mall")[0].get_text())
            star_mask.append(i.select(".star_mask")[0].get_text())
            atc.append(i.select(".atc")[0].get_text())
            n += 1

            
        if n > 100:
            break    
        #현재 페이지를 얻고 int형으로 변환
        currentPage = soup.select(".now_page")[0].get_text()
        currentPage_int = int(currentPage)
        # print(currentPage_int)
        
        #다음 페이지로 넘어감/다음페이지가 없으면 창 종료
        page_num = driver.find_elements_by_xpath("//a[@data-pagenumber='{}']".format(currentPage_int + 1))
        if len(page_num) > 0:
            page_num[0].click()
            driver.implicitly_wait(3)
        else:
            print("끝")
            driver.quit()
            quit()

        sleep(1)

    data = {'prod_tit':prod_tit,'url': url, 'date': date, 'mall': mall, 'star_mask':star_mask, 'atc':atc}

    return data   
