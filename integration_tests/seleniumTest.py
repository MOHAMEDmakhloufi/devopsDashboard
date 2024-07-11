from selenium import webdriver
from selenium.webdriver.chrome.service import Service as ChromiumService
from webdriver_manager.chrome import ChromeDriverManager
from webdriver_manager.core.os_manager import ChromeType

from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
import sys

class Monitoring(webdriver.Chrome):
    def __init__(self, BASE_URL, teardown=False):
        self.BASE_URL = BASE_URL
        self.teardown = teardown
        options = webdriver.ChromeOptions()
        if len(sys.argv) >= 2:

            options.add_argument('--headless')  # Run Chrome in headless mode
            options.add_argument('--no-sandbox')  # Bypass OS security model
            options.add_argument('--disable-dev-shm-usage')  # Overcome limited resource problems
            options.add_argument('--disable-gpu')
            options.add_argument('--disable-extensions')
            options.add_argument('--disable-infobars')
            options.add_argument('--start-maximized')
            options.add_argument('--window-size=1920,1080')
            self.teardown = True
            super(Monitoring, self).__init__(
                service=ChromiumService(ChromeDriverManager().install()),
                options=options)  # Overcome limited resource problems

        else :
            options.add_experimental_option('excludeSwitches', ['enable-logging'])
            options.add_experimental_option("detach", True)
            super(Monitoring, self).__init__(options=options)
            self.maximize_window()
        self.implicitly_wait(6)


    def __exit__(self, exc_type, exc_val, exc_tb):
        if self.teardown:
            self.quit()

    def land_first_page(self):
        self.get(self.BASE_URL)


    def is_element_exist(self, by=By.CSS_SELECTOR, value=''):
        try:
            self.find_element(by, value)
            return True
        except Exception as e:
            return False

    def scroll_to_and_click_select(self):
        try:
            select_element = self.find_element(By.ID, 'select_build')
            self.execute_script("arguments[0].scrollIntoView(true);", select_element)
            self.execute_script("window.scrollBy(0, -100);")
            select_element.click()
            select_element.select_by_index(0)
            print("Clicked on the select element.")
        except Exception as e:
            print(f"An error occurred: {e}")

def display_test_cases(test_cases ):
    count_passed_tests = len(list(filter(lambda test_case: test_case["status"], test_cases)))
    count_failed_tests = len(test_cases) - count_passed_tests
    print(f'Total Selenium Tests : {len(test_cases)}')
    print(f'Total Selenium Passed Tests : {count_passed_tests}')
    print(f'Total Selenium Failed Tests : {count_failed_tests}')
    for ind, test in enumerate(test_cases):
        print(f'Test Selenium {ind+1} : { "Passed" if test["status"] else "Failed" } <{test["test"]}>')
    if count_failed_tests :
        raise Exception('Selenium Test Stage Was Failed')

if __name__ == '__main__':
    with Monitoring("http://devops_dashboard/" if len(sys.argv) >= 2 else"http://localhost:4200/", True) as m:
        testCases = []
        m.land_first_page()
        is_general_section_exist = m.is_element_exist(By.ID,value='GENERAL_INFORMATION')
        testCases.append({'status': is_general_section_exist, 'test': 'is general section exist'})
        is_builds_details_exist = m.is_element_exist(By.ID, value='Builds_Details')
        testCases.append({'status': is_builds_details_exist, 'test': 'is builds details exist'})
        #m.scroll_to_and_click_select()
        display_test_cases(testCases)

