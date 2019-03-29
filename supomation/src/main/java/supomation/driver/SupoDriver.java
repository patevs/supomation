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
	
	// geckodriver capabilities 
	//DesiredCapabilities capabilities = DesiredCapabilities.firefox();
	
	private WebDriver webDriver;
	
	public WebDriver getWebDriver() {
		return webDriver;
	}
	private void setWebDriver(WebDriver webDriver) {
		this.webDriver = webDriver;
	}

	// ----------- //
	// CONSTRUCTOR //
	// ----------- //
	public SupoDriver() {
		System.out.println("\n\tConstructing SupoDriver using GeckoDriver...");
		setWebDriver(createWebDriver());
	}
	
	// ------- //
	// METHODS //
	// ------- //
	
	/**
	 * Creates a WebDriver in selenium
	 * @return WebDriver
	 */
	private WebDriver createWebDriver() {
		System.out.println("\n\tGeckoDriver binary: \n\t\t ~" + GECKO_RELATIVE_PATH + '\n');
		// return geckodriver
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
		System.out.print("\n\tShutting down webdriver... ");
        webDriver.quit();
		// double check driver has closed
        //if(webDriver != null) {
		//	webDriver.close();
		//}
        System.out.println("\tDone.\n");
	}
	
	/**
	 * Navigate the webdriver to a given url
	 * @param url
	 */
	public void gotoUrl(String url)	{
		webDriver.get(url);
	}
	
	/**
	 * @return the current webpage's title
	 * 	or null if not set.
	 */
	public String getPageTitle() {
		return webDriver.getTitle();
	}
	
}


// EOF


