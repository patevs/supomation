package supomation;

import asg.cliche.Command;
import asg.cliche.ShellFactory;
import java.io.IOException;

/**
 * * Main.java
 *
 * Main class contains the application main method which is the application
 * entry point.
 *
 * @author patevs
 */
public class Main {

    /*************
     * * METHODS *
     *************/

    @Command // One,
    public String hello() {
        return "Hello, World!";
    }

    @Command // two,
    public int add(int a, int b) {
        return a + b;
    }

    /**
     * main method - application entry point
     */
    public static void main(String[] args) throws IOException {
        System.out.println("\n\t-> Starting Supomation...");
        // ..
        ShellFactory.createConsoleShell("hello", "", new Main()).commandLoop(); // and three.
        // ..
        System.out.println("\n\t-> Stopping Supomation...");
        // ..
    }
    // ..
}

/* EOF */
