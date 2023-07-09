package org.example;

import com.google.gson.Gson;
import java.net.MalformedURLException;
import java.util.Arrays;
import java.util.concurrent.*;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicReference;

import static org.example.Database.checkUser;
import static org.example.Database.getUsernameByEmail;
import static spark.Spark.*;

public class Login {
    public Login(){
        post("/sign-in", (request, response) -> {
            // Odczytanie danych z zapytania
            String email = request.queryParams("Email");
            String password = request.queryParams("Password");

            if (checkUser(email, password)){

                // sprawdzamy jaki username pasuje do EMAIL
                String username = getUsernameByEmail(email);
                Sesja.USERNAME_.set(username);
                System.out.println("USERNAME: " + username);


                return new Gson().toJson(true);
            }

            // zwrócenie odpowiedzi do klienta
            return new Gson().toJson(false);
        });
    }
}
