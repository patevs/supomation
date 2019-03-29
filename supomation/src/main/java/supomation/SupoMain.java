package supomation;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.ExpectedCondition;
import org.openqa.selenium.support.ui.WebDriverWait;

/**
 * 
 * 	SupoMain - application entry point
 * 
 * @author Patrick Evans
 *
 */
public class SupoMain 
{
	
	// FIELDS
	private static final String GECKO_RELATIVE_PATH = "\\drivers\\geckodriver-windows-64bit.exe";
	private static final String GECKO_ABSOLUTE_PATH = System.getProperty("user.dir") + GECKO_RELATIVE_PATH;
	// WebDriver member;
	private static WebDriver driver;
	
	// CONSTRUCTOR
	public SupoMain() {
		System.out.println(
			"\t * Constructing WebDriver in SupoMain.\n"
			+ "\t * Relative path to Gecko Driver executable:\n"
			+ "\t\t~" + GECKO_RELATIVE_PATH + "\n"
		);
		driver = createWebDriver();
	}
	
	/**createWebDriver
	 * 
	 * Creates a WebDriver in selenium
	 * 
	 * @return WebDriver
	 */
	private static WebDriver createWebDriver() 
	{
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
	private static FirefoxDriver createGeckoDriver(String execPath) 
	{
		// setting gecko driver executable location
		System.setProperty("webdriver.gecko.driver", execPath);
		return new FirefoxDriver();
	}
	
	/**
	 * Shutdown the webdriver.
	 */
	private static void shutdownWebDriver() 
	{
        //Close the browser
		System.out.print("Shutting down webdriver... ");
        driver.quit();
        System.out.println("Done.");
	}
	
	/**
	 * Navigate the webdriver to a given url
	 * @param url
	 */
	private static void testWebSite(String url)
	{
		// navigate to given url
		driver.get(url);
		System.out.println("Webpage title: " + driver.getTitle());
	}
	
	private static void testNewWorld()
	{
		String url = "https://www.ishopnewworld.co.nz/specials";
		testWebSite(url);

		//String containerCss = ".fs-product-grid > div:nth-child(1) > div:nth-child(1)";
		String containerCss = ".fs-product-grid";
		WebElement containerElem = driver.findElement(By.cssSelector(containerCss));
		System.out.println("container elem: " + containerElem.getText());	
		
		String cardCss = "div.u-margin-bottom-x2:nth-child(1) > div:nth-child(1)";
		WebElement cardElem = driver.findElement(By.cssSelector(cardCss));
		System.out.println("card elem: " + cardElem.getText());
	}
	
	/**
	 * Test the webdriver works in selenium.
	 * 	TODO: Turn this init junit test case.
	 */
	public static void testWebDriverGoogle() 
	{
        // And now use this to visit Google
        driver.get("http://www.google.com");
        // Alternatively the same thing can be done like this
        //driver.navigate().to("http://www.google.com");

        // Find the text input element by its name
        WebElement element = driver.findElement(By.name("q"));
        // Enter something to search for
        element.sendKeys("Cheese!");
        // Now submit the form. WebDriver will find the form for us from the element
        element.submit();
        // Check the title of the page
        System.out.println("Page title is: " + driver.getTitle());
        // Google's search is rendered dynamically with JavaScript.
        // Wait for the page to load, timeout after 10 seconds
        (new WebDriverWait(driver, 10)).until(new ExpectedCondition<Boolean>() {
            public Boolean apply(WebDriver d) {
                return d.getTitle().toLowerCase().startsWith("cheese!");
            }
        });
        // Should see: "cheese! - Google Search"
        System.out.println("Page title is: " + driver.getTitle());
	}
	
	
	/**
	 * 	SupoMain - main method
	 * 
	 * @param args
	 */
	public static void main(String[] args) 
	{
		System.out.println("\n -> Starting Supomation...\n -> Creating SupoMain...");
		//SupoMain supo = 
		new SupoMain();
		//SupoMain.testWebDriverGoogle();
		SupoMain.testNewWorld();
		SupoMain.shutdownWebDriver();
	}

}
