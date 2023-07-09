package org.example;

import com.google.gson.Gson;

import java.util.concurrent.atomic.AtomicReference;

import static org.example.Database.*;
import static spark.Spark.*;

public class Registration {
    public Registration() {


        AtomicReference<String> result = new AtomicReference<>("0");

        post("/set-result", (request, response) -> {
            String result_ = request.queryParams("speed_");
            System.out.println("dfdf " + result_);
            result.set(result_);
            System.out.println("FLAGA_10000");
            return new Gson().toJson(true);
        });

        post("/sign-up", (request, response) -> {
            // Odczytanie danych z zapytania
            String userName = request.queryParams("UserName");
            String Email = request.queryParams("Email");
            String Password = request.queryParams("Password");

            // sprawdzanie czy taki username istnieje
            System.out.println();
            if(checkIfUserExists(userName) == false){
                return new Gson().toJson("userName");
            }

            // sprawdzanie czy taki email istnieje
            if(checkIfEmailExists(Email) == false){
                return new Gson().toJson("email");
            }


            // dodaj usera
//            addUser(Email, Password, userName);
            addUserResult(Email, Password, userName, result.get());

            // dodanie użytkownika do sesji
            Sesja.USERNAME_.set(userName);

            // WYŚWIETL INFORMACJE Z BAZY
            displayAllUsers();

            // wyświetlenie informacji
            System.out.println("Rejestracja: " + userName + " , " + Email + " , " + Password);

            // zwrócenie odpowiedzi do klienta
            return new Gson().toJson("result");
        });
    }
}

