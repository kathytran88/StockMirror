from bs4 import BeautifulSoup
import requests
from lxml import etree
import json
import sys

def fetch_html(url):
    """Fetch HTML content from the given URL."""
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Connection': 'keep-alive'
    }
    response = requests.get(url, headers=headers)
    return response.content

def parse_links(html_content):
    """Parse links from HTML content."""
    soup = BeautifulSoup(html_content, 'html.parser')
    all_links = []
    for i in range(1, 100):
        a_elements = soup.select(f'#port_body > ul > li:nth-of-type({i}) > a')
        links = [(a.get('href'), a.text.strip() if a.text else '') for a in a_elements]
        fixed_links = [("https://www.dataroma.com/" + href, text) for href, text in links]
        all_links.extend(fixed_links)
    return all_links

def scrape_data_from_link(link):
    """Scrape data from the given link."""
    html_content = fetch_html(link)
    soup = BeautifulSoup(html_content, 'html.parser')
    data_rows = []
    for i in range(1, 100):
        td_elements = soup.select(f'#grid > tbody > tr:nth-of-type({i}) > td')
        data = [td.text.strip() if td.text else '' for td in td_elements]
        if data:
            data_rows.append(data[1:])
    return data_rows

def scrape_links(investor_name):
    """Scrape links containing the given investor's name."""
    html_content = fetch_html("https://www.dataroma.com/m/home.php")
    all_links = parse_links(html_content)
    investor_links = [(href, name) for href, name in all_links if investor_name in name]
    return investor_links

def scrape_data_for_investor(investor_name):
    """Scrape data for the given investor."""
    investor_links = scrape_links(investor_name)
    data = []
    for href, name in investor_links:
        data.extend(scrape_data_from_link(href))

    return json.dumps(data)




# investor_name = "Warren Buffet"
# data = scrape_data_for_investor(investor_name)
# print(data)

if __name__ == "__main__":
    
    name = sys.argv[1]
    result = scrape_data_for_investor(name)
    print(result)

