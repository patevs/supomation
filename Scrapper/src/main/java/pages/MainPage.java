
/**
 *  src/main/java/pages/MainPage.java
 */

package pages;

import com.github.webdriverextensions.WebPage;
import org.openqa.selenium.support.FindBy;
import static com.github.webdriverextensions.Bot.assertCurrentUrlStartsWith;
import org.openqa.selenium.WebElement;

public class MainPage extends WebPage {

    // Url
    //public String url = SupoScrapper.url;
    public String url = "http://localhost:8181/";

    // Model
    @FindBy(css = "cssselector")
    public WebElement exampleWebElement;
    // ...add your Page's WebElements and WebComponents here

    @Override
    public void open(Object... arguments) {
        open(url);
        assertIsOpen();
    }

    @Override
    public void assertIsOpen(Object... arguments) throws Error {
        assertCurrentUrlStartsWith(url);
        // ...add your asserts that ensures that the page is loaded
    }

}