package supomation.pages;

import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

import com.github.webdriverextensions.Bot;
import com.github.webdriverextensions.WebPage;

import supomation.SupoSite;

public class SupoMainPage extends WebPage {
    // Logger
    //@SuppressWarnings("unused")
	//private static final Logger log = LoggerFactory.getLogger(MainPage.class);

    // Url
    public String url = SupoSite.url;

    // Model
    @FindBy(css = "cssselector")
    public WebElement exampleWebElement;
    //@FindBy(css = "cssselector")
    //public ExampleWebComponent exampleWebComponent;
    // ...add your Page's WebElements and WebComponents here

    @Override
    public void open(Object... arguments) {
        open(url);
        assertIsOpen();
    }

    @Override
    public void assertIsOpen(Object... arguments) throws Error {
        Bot.assertCurrentUrlStartsWith(url);
        // ...add your asserts that ensures that the page is loaded
    }
}
