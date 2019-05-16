package supomation.pages;

import java.util.List;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

import com.github.webdriverextensions.Bot;
import com.github.webdriverextensions.WebPage;

import supomation.SupoSite;

public class SupoMainPage extends WebPage {
    // Logger
    // @SuppressWarnings("unused")
    // private static final Logger log = LoggerFactory.getLogger(MainPage.class);

    // Url
    public String url = SupoSite.url;

    // Model
    @FindBy(css = "cssselector")
    public WebElement exampleWebElement;

    @FindBy(css = ".fs-product-grid")
    public WebElement productGridElem;

    // .fs-product-grid > div:nth-child(1) > div:nth-child(1)
    // div.u-margin-bottom-x2:nth-child(1) > div:nth-child(1)
    // div.u-margin-bottom-x2:nth-child(1) > div:nth-child(1) > div:nth-child(4)

    // html body.-no-touch div.content section.fs-product-grid.js-product-grid
    // div.l-main.u-flex-justify-center div.l-container
    // div.l-columns.l-columns--five
    // div.l-columns__column.l-columns__column--one-l.l-columns__column--one-half-m.u-margin-bottom-x2
    // div.fs-product-card
    // div.js-product-card-footer.fs-product-card__footer-container
    // div.fs-product-card__footer div.fs-product-card__price-info

    // @FindBy(css = "cssselector")
    // public ExampleWebComponent exampleWebComponent;
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

    public void printProducts() {
        String gridText = productGridElem.getText();
        // System.out.println("Product grid: \n" + gridText);
        List<WebElement> productsElems = productGridElem.findElements(By.tagName("div"));
        for (WebElement elem : productsElems) {
            System.out.println(elem.getText());
        }
    }

}

// EOF
