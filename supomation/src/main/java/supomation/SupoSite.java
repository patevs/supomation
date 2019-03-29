package supomation;

import com.github.webdriverextensions.Bot;
import com.github.webdriverextensions.WebSite;

import supomation.pages.SupoMainPage;

public class SupoSite extends WebSite {
    // Logger
    //@SuppressWarnings("unused")
	//private static final Logger log = LoggerFactory.getLogger(ExSite.class);

    // target url
	public static String url = "https://www.ishopnewworld.co.nz/specials";

    // Pages
    public SupoMainPage supoMainPage;
    // ...add your Site's WebPages here

    public void open(Object... arguments) {
        open(url);
    }

    @Override
    public void assertIsOpen(Object... arguments) throws Error {
    	Bot.assertCurrentUrlStartsWith(url);
        //assertCurrentUrlStartsWith(url);
    }
}
