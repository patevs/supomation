
/**
 *  src/main/java/SupoScrapper.jav
 */

import com.github.webdriverextensions.WebSite;
import static com.github.webdriverextensions.Bot.assertCurrentUrlStartsWith;

public class SupoScrapper extends WebSite {

    // target url
    public static String url = "http://localhost:8181";

    // Pages
    //public MainPage mainPage;

    public void open(Object... arguments) {
        open(url);
    }

    @Override
    public void assertIsOpen(Object... arguments) throws Error {
        assertCurrentUrlStartsWith(url);
    }

}