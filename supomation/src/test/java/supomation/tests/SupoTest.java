package supomation.tests;

import static org.junit.Assert.assertTrue;

import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;

import supomation.driver.SupoDriver;

/**
 * 
 * 	SupoTest
 * 
 * 	 supomation test cases
 * 
 * @author patevs
 */
public class SupoTest {
	
	// FIELDS
	private static SupoDriver driver;
	
	@BeforeClass
	public static void beforeClass() {
		driver = new SupoDriver();
	}
	
	@AfterClass
	public static void afterClass() {
		driver.shutdownWebDriver();
	}
	
	@Test
	public void supoDriverBasicTest() {
		driver.gotoUrl("https://www.google.com/");
		String pageTitle = driver.getPageTitle();
		boolean titleCorrect = pageTitle.contains("Google");
		//System.out.println("Title contains google: " + titleCorrect);
		assertTrue(
				"Webpage title should contain 'Google'."
				+ " Actual: " + pageTitle, 
				titleCorrect
		);
	}
	
	@Test
	public void newWorldTest() {
		String url = "https://www.ishopnewworld.co.nz/specials";
		driver.gotoUrl(url);
		String pageTitle = driver.getPageTitle();
		//System.out.println("Page title: " + pageTitle);
		boolean titleCorrect = pageTitle.contains("Specials");
		assertTrue(
				"Webpage title should contain 'Specials'."
				+ " Actual: " + pageTitle, 
				titleCorrect
		);
		//String containerCss = ".fs-product-grid > div:nth-child(1) > div:nth-child(1)";
		//String containerCss = ".fs-product-grid";
		//WebElement containerElem = driver.findElement(By.cssSelector(containerCss));
		//System.out.println("container elem: " + containerElem.getText());	
		
		//String cardCss = "div.u-margin-bottom-x2:nth-child(1) > div:nth-child(1)";
		//WebElement cardElem = driver.findElement(By.cssSelector(cardCss));
		//System.out.println("card elem: " + cardElem.getText());
	}

}


// EOF


