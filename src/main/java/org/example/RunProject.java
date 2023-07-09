package org.example;

import com.google.gson.Gson;
import spark.Spark;

import java.net.MalformedURLException;
import java.util.Arrays;
import java.util.concurrent.*;
import java.util.concurrent.atomic.AtomicReference;

import static spark.Spark.*;

public class RunProject {
    // Ścieżka do katalogu z projektem html,css,js
    private static final String MAIN_DIRECTORY = "C://Users//128//Desktop//TechnikiInternetowe//PROJEKT_13";

//    private static final String MAIN_DIRECTORY = "/dane/TI/PROJEKT_13";

    private static String lastLanguage = ""; // jaki język ostatnio był pobierany z bazy danych
    private static ExecutorService executor = Executors.newSingleThreadExecutor();
    // przetrzymywanie kodu danych języków
    private static String savedDataPython;
    private static String savedDataC;
    private static String savedDataCSHARP;
    private static String savedDataGO;
    private static String savedDataRUST;
    private static String savedDataJava;
    private static String savedDataJavaScript;

    public static void main(String[] args) throws ExecutionException, InterruptedException {
        Spark.port(5100);

        Database database = new Database();
     //   Sesja sesja = new Sesja();
//        dropTable("user");
//        database = new Database();


        // do obługi żądania POST - get-text
        AtomicReference<String> language = new AtomicReference<>("");
        final Callable<String>[] callable = new Callable[]{new MyCallable("PYTHON")};
        final Future<String>[] future = new Future[]{executor.submit(callable[0])};
        savedDataPython = Arrays.toString(future);

        // pobieranie danych ze strony na osobnym watku
        fetchAndSaveData("PYTHON");
        fetchAndSaveData("C++");
        fetchAndSaveData("C#");
        fetchAndSaveData("JAVA");
        fetchAndSaveData("JavaScript");
        fetchAndSaveData("GO");
        fetchAndSaveData("RUST");

        // Wczytywanie plików css, html, js
        staticFiles.externalLocation(MAIN_DIRECTORY);

        // Do obdługi żądań GET
        Redirecting redirecting = new Redirecting(MAIN_DIRECTORY, executor);

        // Logowanie
        Login login = new Login();

        // Rejesrtacja
        Registration registration = new Registration();

        // Sesja
        Sesja sesja = new Sesja();

        post("/get-text", (request, response) -> {
            String requestData = request.body();
            saveData(future[0].get(), String.valueOf(language));
            String result = getData(requestData);
            callable[0] = new MyCallable(requestData);
            future[0] = executor.submit(callable[0]);
            language.set(requestData);
            // obsługa przesłanych danych
            return new Gson().toJson(result);  // zwrócenie odpowiedzi do klienta
        }); fetchAndSaveData(lastLanguage);


    }


    private static void fetchAndSaveData(String language) {
        DataFetcher dataFetcher = new DataFetcher();
        executor.execute(dataFetcher);

        // Wykonaj logikę wątku i pobierz dane
        CodeDownload codeDownload = null;
        try {
            codeDownload = new CodeDownload();
        } catch (MalformedURLException e) {
            throw new RuntimeException(e);
        }
        String data = "";
        try {
            data = String.valueOf(codeDownload.download(language));
        } catch (MalformedURLException e) {
            throw new RuntimeException(e);
        }
        // Zapisz odebrane dane
        saveData(data, language);
    }

    static synchronized void saveData(String data, String language) {
        // savedData = data;

        if (language.equals("JavaScript")) {
            savedDataJavaScript = data;
        }
        // JAVA
        else if (language.equals("JAVA")) {
            savedDataJava = data;
        }
        // PYTHON
        else if (language.equals("PYTHON")) {
            savedDataPython = data;
        }
        // C++
        else if (language.equals("C++")) {
            savedDataC = data;
        }
        // C#
        else if (language.equals("C#")) {
            savedDataCSHARP = data;
        }
        // GO
        else if (language.equals("GO")) {
            savedDataGO = data;
        }
        // RUST
        else if (language.equals("RUST")) {
            savedDataRUST = data;
        }

    }

    static synchronized String getData(String language) {
        //  return savedData;
        if (language.equals("JavaScript")) {
            return savedDataJavaScript;
        }
        // JAVA
        else if (language.equals("JAVA")) {
            return savedDataJava;
        }
        // PYTHON
        else if (language.equals("PYTHON")) {
            return savedDataPython;
        }
        // C++
        else if (language.equals("C++")) {
            return savedDataC;
        }
        // C#
        else if (language.equals("C#")) {
            return savedDataCSHARP;
        }
        // GO
        else if (language.equals("GO")) {
            return savedDataGO;
        }
        // RUST
        else if (language.equals("RUST")) {
            return savedDataRUST;
        }

        return "";
    }



}

class DataFetcher implements Runnable {
    private String data;

    public String getData() {
        return data;
    }

    @Override
    public void run() {
    }
}

class MyCallable implements Callable<String> {
    private  String language;

    public MyCallable(String language) {
        this.language = language;
    }
    @Override
    public String call() throws Exception {
        // Poczekaj na zakończenie wątku i pobierz dane
        String data = "";
        // Wykonaj logikę wątku i pobierz dane
        CodeDownload codeDownload = null;
        try {
            codeDownload = new CodeDownload();
        } catch (MalformedURLException e) {
            throw new RuntimeException(e);
        }
        try {
            data = String.valueOf(codeDownload.download(language));
        } catch (MalformedURLException e) {
            throw new RuntimeException(e);
        }
        // Drukuj zapisane dane
        return data;
    }
}