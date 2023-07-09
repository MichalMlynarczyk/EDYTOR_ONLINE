package org.example;
import com.google.gson.Gson;

import java.util.concurrent.atomic.AtomicReference;

import static org.example.Database.*;
import static spark.Spark.*;


public class Sesja {

    // sprawdzanie czy użytkownik jest zalgowany
    static AtomicReference<String> SESJA_ = new AtomicReference<>("niezalogowany");
    // username aktualnrgo użytkownika
    static AtomicReference<String> USERNAME_ = new AtomicReference<>("");


    public Sesja(){

        post("/get-info", (request, response) -> {
            /// pobranie i porównanie nowego wyniku i starego
            // w razie potrzeby zaaktualizowanie nowego wyniku
            String wynik = request.queryParams("wynik");
            String poprzedniWynik = getResultByUsername(String.valueOf(USERNAME_));

            if (Integer.parseInt(poprzedniWynik) < Integer.parseInt(wynik)){
                updateResultByUsername(String.valueOf(USERNAME_), wynik);
                System.out.println("update");
            }

            System.out.println("Wynik: " + wynik);
            String sesja_ = SESJA_.get();
            // zwrócenie odpowiedzi do klienta
            return new Gson().toJson(sesja_);
        });

        post("/set-info", (request, response) -> {
            System.out.println("FLAGA_10000");
            // Odczytanie danych z zapytania

            SESJA_.set("zalogowany");

            // zwrócenie odpowiedzi do klienta
            return new Gson().toJson(true);
        });

        post("/get-username", (request, response) -> {
            // zwrócenie odpowiedzi do klienta
            return new Gson().toJson(String.valueOf(USERNAME_));
        });

        post("/end", (request, response) -> {
            USERNAME_.set("");
            return null;
        });


    }
}
