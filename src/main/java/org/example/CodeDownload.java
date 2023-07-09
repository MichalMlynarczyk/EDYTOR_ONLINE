package org.example;
import java.net.MalformedURLException;
import java.util.concurrent.atomic.AtomicReference;

import static org.example.StaticMethod.*;


/**
 * Do pobierania kodu z githuba
 */
public class CodeDownload {
    public  CodeDownload () throws MalformedURLException {
       // downloadPython();
    }

    AtomicReference<String> download(String language) throws MalformedURLException {

        System.out.println("FLAGA_1");

        String code = "";

        // JAVA SCRIPT
        if (language.equals("JavaScript")) {
            code = downloadJavaScript();
        }
        // JAVA
        else if (language.equals("JAVA")) {
            code = downloadJava();
        }
        // PYTHON
        else if (language.equals("PYTHON")) {
            System.out.println("FLAGA_2");
            code = downloadPython();
        }
        // C++
        else if (language.equals("C++")) {
            code = downloadC();
        }
        // C#
        else if (language.equals("C#")) {
            code = downloadCSHARP();
        }
        // GO
        else if (language.equals("GO")) {
            code = downloadGO();
        }
        // RUST
        else if (language.equals("RUST")) {
            code = downloadRUST();
        }

        AtomicReference<String> atomicReference = new AtomicReference<>(code);

        return atomicReference;
    }

    String downloadPython() throws MalformedURLException {
        String link = returnLink("https://github.com/MichalMlynarczyk/PROJEKT/tree/main/Python", 5);
        String code = downloadCode(link);
        return code;
    }

    String downloadJava() throws MalformedURLException {
        String link = returnLink("https://github.com/MichalMlynarczyk/PROJEKT/tree/main/JAVA", 5);
        String code = downloadCode(link);
        return code;
    }

    String downloadCSHARP() throws MalformedURLException {
        String link = returnLink("https://github.com/MichalMlynarczyk/PROJEKT/tree/main/C%23", 5);
        String code = downloadCode(link);
        return code;
    }

    String downloadGO() throws MalformedURLException {
        String link = returnLink("https://github.com/MichalMlynarczyk/PROJEKT/tree/main/GO", 5);
        String code = downloadCode(link);
        return code;
    }

    String downloadJavaScript() throws MalformedURLException {
        String link = returnLink("https://github.com/MichalMlynarczyk/PROJEKT/tree/main/JavaScript", 10);
        String code = downloadCode(link);
        return code;
    }

    String downloadRUST() throws MalformedURLException {
        String link = returnLink("https://github.com/MichalMlynarczyk/PROJEKT/tree/main/RUST", 5);
        String code = downloadCode(link);
        return code;
    }

    String downloadC() throws MalformedURLException {
        String link = returnLink("https://github.com/MichalMlynarczyk/PROJEKT/tree/main/C%2B%2B", 10);
        String code = downloadCode(link);
        return code;
    }

}










