
'''
    Scrapper/main.py
'''


# -------------------------------

# IMPORTS

from webdrivermanager import GeckoDriverManager
from selenium import webdriver

# -------------------------------


# GLOBAL VARIABLES

gdd = GeckoDriverManager()
driver = None

target = "https://www.newworld.co.nz/"
mailer = target + "savings/virtualmailer/" + "?store=thorndon-1260" #+ "?c=lni-4-10-mar&page=1"

# Main method
def main():
    print("\n  ---- Supo Scrapper ----")

    print("\n\tDownload and install GeckoDriver...")
    gdd.download_and_install()

    print("\n\tStarting Firefox...")
    driver = webdriver.Firefox()

    print("\n\tNavigate to target...")
    driver.get(mailer)
                            
    #download_btn_elem = driver.find_element_by_class_name()
    
    print("\n\tClosing Firefox...")
    #driver.quit()

    print("\n  -------- Done. --------\n")

    return 0


# Application entry point
if __name__ == "__main__":
    main()


# EOF

