package supomation.driver;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;

/**
 * 	
 * 	SupoDriver class
 * 
 * 	 Constructs/initializes the selenium webdriver
 * 	 and stores its state. WebDriver helper methods
 * 	 will be found in this class
 * 
 * 	@author patevs
 */
public class SupoDriver {
	
	// ------ //
	// FIELDS //
	// ------ //
	
	// gecko driver binary
	private static final String GECKO_RELATIVE_PATH = "\\drivers\\geckodriver-windows-64bit.exe";
	private static final String GECKO_ABSOLUTE_PATH = System.getProperty("user.dir") + GECKO_RELATIVE_PATH;
	// WebDriver;
	private static WebDriver driver;

	// ------- //
	// METHODS //
	// ------- //
	
	/**
	 * Creates a WebDriver in selenium
	 * @return WebDriver
	 */
	@SuppressWarnings("unused")
	private static WebDriver createWebDriver() {
		return createGeckoDriver(GECKO_ABSOLUTE_PATH);
	}
	
	/**createGeckoDriver
	 * 
	 * 	Creates a Firefox webdriver object in selenium
	 * 	 using gecko driver executable.
	 * 
	 * @param execPath path to gecko driver executable
	 * @return FirefoxDriver WebDriver
	 */
	private static FirefoxDriver createGeckoDriver(String execPath) {
		// setting gecko driver executable location
		System.setProperty("webdriver.gecko.driver", execPath);
		return new FirefoxDriver();
	}
	
	/**
	 * Shutdown the webdriver.
	 */
	@SuppressWarnings("unused")
	private static void shutdownWebDriver() {
        //Close the browser
		System.out.print("Shutting down webdriver... ");
        driver.quit();
        System.out.println("Done.");
	}
	
	/**
	 * Navigate the webdriver to a given url
	 * @param url
	 */
	@SuppressWarnings("unused")
	private static void gotoUrl(String url)	{
		// navigate to given url
		driver.get(url);
		System.out.println("Webpage title: " + driver.getTitle());
	}
	
}
