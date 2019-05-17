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

    @Command
    public String sayHello() {
        return "Hello!";
    }

    @Command
    public int add(int a, int b) {
        return a + b;
    }

    @Command
    public void exit() {
        // ..
    }

    /**
     * main method - application entry point
     */
    public static void main(String[] args) throws IOException {
        System.out.println("\n\t-> Starting Supomation...");
        // ..
        ShellFactory.createConsoleShell("supomation>", "Enter '?list' to list all commands", new Main()).commandLoop();
        // ..
        System.out.println("\n\t-> Stopping Supomation...");
        // ..
    }
    // ..
}

/* EOF */
