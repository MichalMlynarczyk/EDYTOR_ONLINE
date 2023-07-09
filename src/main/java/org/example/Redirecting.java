package org.example;

import com.google.gson.Gson;

import java.util.concurrent.ExecutorService;

import static org.example.Database.*;
import static org.example.RunProject.getData;
import static org.example.RunProject.saveData;
import static org.example.StaticMethod.sendDataToPage;
import static spark.Spark.*;

public class Redirecting {

    public Redirecting(String MAIN_DIRECTORY, ExecutorService executor){

        // Wczytywanie plików css, html, js
        staticFiles.externalLocation(MAIN_DIRECTORY);

        // Przekierowanie na strone główną
        get("/", (req, res) -> {
            res.redirect("/main.html");
            return null;
        });

        // Przekierowanie na stronę z logowaniem
        get("/redirect", (req, res) -> {
            String url = "/LogowanieRejestracja/LOGOWANIE/HTML/LOGIN_WINDOW.html";
            String script = "window.open('" + url + "', '_blank');";
            res.body("<html><head><script>" + script + "</script></head><body></body></html>");
            return null;
        });

        // Otwieranie nowego okna przeglądarki
        get("/open-page", (req, res) -> {
            String url = "/LogowanieRejestracja/LOGOWANIE/HTML/LOGIN_WINDOW.html";
            String script = "window.open('" + url + "', '_blank');";
            String html = "<html><body><script>" + script + "</script></body></html>";
            sendDataToPage();
            return html;
        });

        // pobieranie rankingu z bazy
        post("/get-ranking", (request, response) -> {
//            String ranking = getAllRecords();
            String ranking = getUsersData();
            System.out.println(ranking);

            // obsługa przesłanych danych
            return new Gson().toJson(ranking);  // zwrócenie odpowiedzi do klienta
        });

    }

}
