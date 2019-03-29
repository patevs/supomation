package supomation.tests;

import static org.junit.Assert.fail;

import org.junit.Test;

import supomation.control.SupoMain;

/**
 * 
 * 	SupoTest
 * 
 * 	 supomation test cases
 * 
 * @author patevs
 */
public class SupoTest {
	
	//@Test
	public void failTest() {
		fail("assert fail Test");
	}
	
	@Test
	public void supoMainTest() {
		//SupoMain supoMain = new SupoMain();
		SupoMain.main(null);
	}
	
	//@Test
	/*
	public void supoDriverBasicTest() {
		supoDriver.gotoUrl("https://www.google.com/");
		String pageTitle = supoDriver.getPageTitle();
		boolean titleCorrect = pageTitle.contains("Google");
		//System.out.println("Title contains google: " + titleCorrect);
		assertTrue(
				"Webpage title should contain 'Google'."
				+ " Actual: " + pageTitle, 
				titleCorrect
		);
	}
	*/
	
	//@Test
	/*
	public void newWorldTest() {
		String url = "https://www.ishopnewworld.co.nz/specials";
		supoDriver.gotoUrl(url);
		String pageTitle = supoDriver.getPageTitle();
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
	*/

}


// EOF


