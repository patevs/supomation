
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


# Main method
def main():
    print("\n  ---- Supo Scrapper ----")

    print("\n\tDownload and install GeckoDriver...")
    gdd.download_and_install()

    print("\n\tStarting Firefox...")
    driver = webdriver.Firefox()

    print("\n\tNavigate to target...")
    driver.get(target)

    print("\n\tClosing Firefox...")
    driver.quit()

    print("\n  -------- Done. --------\n")

    return 0


# Application entry point
if __name__ == "__main__":
    main()


# EOF

