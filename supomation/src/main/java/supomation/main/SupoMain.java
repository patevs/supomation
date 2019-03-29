package supomation.main;

/**
 * 
 * 	SupoMain class
 *  
 *   contains the application main method 
 *   used as the entry point when the program 
 *   is run as a java app.
 *   
 * 	@author patevs
 */
public class SupoMain {
	
	//private static SupoDriver supoDriver;
	
	// METHODS
	/*
	private static SupoDriver initWebDriver() {
		System.out.println(
				"\n -> Initializing SupoDriver..."
		);
		return new SupoDriver();
	}
	*/
	
	/**
	 * 	SupoMain - main method
	 */
	public static void main(String[] args) {
		System.out.println(
				"\n -> Starting Supomation..."
		);
		//supoDriver = initWebDriver();
		System.out.println(
				"\n -> Stopping Supomation..."
		);
		//supoDriver.shutdownWebDriver();
	}

}
