package supomation.tests;

import static org.junit.Assert.assertTrue;

import org.junit.Test;
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
        // get page title
		String pageTitle = Bot.title();
		//System.out.println("Page title: " + pageTitle);
		// check the page title is as excepted
		boolean titleCorrect = pageTitle.contains("Specials");
		//System.out.println("Page title correct: " + titleCorrect);
		assertTrue(
				"Webpage title should contain 'Specials'."
				+ " Actual: " + pageTitle, 
				titleCorrect
		);
    }
    
    @Test
    public void mainPageContentTest() throws Exception {
        Bot.open(supoSite);
        Bot.assertIsOpen(supoMainPage);
		
        supoMainPage.printProducts();
        
    }

}


// EOF


