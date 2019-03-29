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
	private WebDriver driver;

	/**
	 * CONSTRUCTOR
	 */
	public SupoDriver() {
		System.out.println("Constructing SupoDriver...");
		driver = createWebDriver();
	}
	
	// ------- //
	// METHODS //
	// ------- //
	
	/**
	 * Creates a WebDriver in selenium
	 * @return WebDriver
	 */
	private WebDriver createWebDriver() {
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
	private FirefoxDriver createGeckoDriver(String execPath) {
		// setting gecko driver executable location
		System.setProperty("webdriver.gecko.driver", execPath);
		return new FirefoxDriver();
	}
	
	/**
	 * Shutdown the webdriver.
	 */
	public void shutdownWebDriver() {
        //Close the browser
		System.out.print("Shutting down webdriver... ");
        //driver.close();
		driver.quit();
        System.out.println("Done.");
	}
	
	/**
	 * Navigate the webdriver to a given url
	 * @param url
	 */
	public void gotoUrl(String url)	{
		driver.get(url);
	}
	
	/**
	 * @return the current webpage's title
	 * 	or null if not set.
	 */
	public String getPageTitle() {
		return driver.getTitle();
	}
	
}


// EOF


