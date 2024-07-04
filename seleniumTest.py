from selenium import webdriver
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By


class Monitoring(webdriver.Chrome):
    def __init__(self, BASE_URL, teardown=False):
        self.BASE_URL = BASE_URL
        self.teardown = teardown
        options = webdriver.ChromeOptions()
        options.add_experimental_option('excludeSwitches', ['enable-logging'])
        options.add_experimental_option("detach", True)
        super(Monitoring, self).__init__(options=options)
        self.implicitly_wait(6)
        self.maximize_window()

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

if __name__ == '__main__':
    with Monitoring("https://flowbite.com/docs/forms/input-field/", True) as m:
        m.land_first_page()
        #is_general_section_exist = m.is_element_exist(value='div.p-5.mb-16.rounded-lg')
        #m.scroll_to_and_click_select()
