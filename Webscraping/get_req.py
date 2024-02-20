import requests
from bs4 import BeautifulSoup, SoupStrainer
import time
URL = "https://bigfuture.collegeboard.org/scholarships"
BASE = "https://bigfuture.collegeboard.org"
def get_links(url, base_url):
    college_response = requests.get(url)
    
    #Print response to text file
    #open('college_response.txt', 'w')
    #print(college_response.text, file=open('college_response.txt', 'w'))
    
    

    if college_response.status_code != 200:
        return f'status failed with {college_response.status_code}'
    #Returns error code if request is not succesful
    else:
        i = 0
        for link in BeautifulSoup(college_response.text, parse_only=SoupStrainer('a'), features="html.parser"):
            if link.has_attr('href'):
                
                full = base_url + link['href']
                #scrape_links(full)
                try:
                    scrape_links(full)
                    #print(full)
                    i += 1
                except:
                    pass
                if ConnectionError == True:
                    print(i)
    #web_scraper(full, base_url)
        
def scrape_links(url):
    scholarship_response = requests.get(url)
    list_of_links = []
    i = 0
    for link in BeautifulSoup(scholarship_response.text, parse_only=SoupStrainer('a'), features="html.parser"):
        if link.has_attr('href') and link['href'] != "https://bigfuture.collegeboard.org/scholarship-search/scholarship-list/":
            try:
                
                requests.get(link['href'])
                print(link['href'])
                list_of_links.append(link['href'])
                i += 1
                
                if i % 10 == 0:
                    time.sleep(1)
                    print(i)
            except:
                pass
                #open('college_response.txt', 'w')
                #print(link, file=open('college_response.txt', 'w'))
        
        
    return list_of_links
            
            
            

listoflinks = get_links(URL, BASE)

listoflinks = dict.fromkeys(listoflinks)

listoflinks.to_csv('scholarship_links.csv')