package supomation;

import org.junit.runner.RunWith;

import com.github.webdriverextensions.junitrunner.WebDriverRunner;
import com.github.webdriverextensions.junitrunner.annotations.Firefox;

import supomation.pages.SupoMainPage;

@RunWith(WebDriverRunner.class)
@Firefox
public class SupoSiteTest {
	
	// Supo Site
	public SupoSite supoSite;
	
	// Supo Pages
	public SupoMainPage supoMainPage;
	
}
