package supomation.tests;

import static org.junit.Assert.assertTrue;

import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

import com.github.webdriverextensions.Bot;

import supomation.SupoSiteTest;

/**
 * 
 * 	SupoTest
 * 
 * 	 supomation test cases
 * 
 * @author patevs
 */
public class SupoTest extends SupoSiteTest {	
    // Logger
    //@SuppressWarnings("unused")
	//private static final Logger log = LoggerFactory.getLogger(MainPageTest.class);

    @Test
    public void openMainPageTest() throws Exception {
        Bot.open(supoSite);
        Bot.assertIsOpen(supoMainPage);
    }
	
	
	@Test
	public void newWorldTest() {
        Bot.open(supoSite);
        Bot.assertIsOpen(supoMainPage);
		String pageTitle = Bot.title();
		//System.out.println("Page title: " + pageTitle);
		boolean titleCorrect = pageTitle.contains("Specials");
		assertTrue(
				"Webpage title should contain 'Specials'."
				+ " Actual: " + pageTitle, 
				titleCorrect
		);
		//String containerCss = ".fs-product-grid > div:nth-child(1) > div:nth-child(1)";
		String containerCss = ".fs-product-grid";
		WebElement containerElem = Bot.driver().findElement(By.cssSelector(containerCss));
		System.out.println("container elem: " + containerElem.getText());	
		
		//String cardCss = "div.u-margin-bottom-x2:nth-child(1) > div:nth-child(1)";
		//WebElement cardElem = driver.findElement(By.cssSelector(cardCss));
		//System.out.println("card elem: " + cardElem.getText());
	}

}


// EOF


