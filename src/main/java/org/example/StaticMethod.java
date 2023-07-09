package org.example;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import spark.Spark;

import java.io.*;
import java.net.MalformedURLException;
import java.net.ProtocolException;
import java.net.URL;
import java.util.ArrayList;
import java.util.Random;

public class StaticMethod {

    /**
     * Zwraca link do pliku z danym językiem
     * Losuje któty plik ma pobrać
     * @link -> link do repo z plikami w danym jezyku
     * @zakres -> liczba plikow w repo
     */
    static String returnLink(String link, int zakresLosowania){

        String href;

        try {

            // łączenie z repozytorium
            String url = link;
            Document doc = Jsoup.connect(url).get();

            /// odczytywanie linów do plików
            // nazwa klady
            String className = "Link--primary";
            // zapis elemtów
            Elements divs = doc.select("a." + className);

            // Losowanie liczby -> który link ma zostać wybrany
            Random random = new Random();
            int liczba = random.nextInt(zakresLosowania) + 1;

            // pobranie linku
            href = divs.get(liczba).attr("href");

        } catch (ProtocolException e) {
            throw new RuntimeException(e);
        } catch (MalformedURLException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        String gitLink = "https://github.com" + href;
        return gitLink;
    }

    /**
     * pobiera kod z danego linku
     * @param link -> link do pliku z którego kod ma być pobrany
     * @return -> zwraca kod jako tablice stringów !
     */
     static String downloadCode(String link) {

         // zmienna do której będzie zapisany kod
         String code = "";

         // pobieranie kodu z linku wraz z znakami białymi
         try {

             // nawiązywanie połączenia
             String url = link;
             Document doc = Jsoup.connect(url).get();

             // wyznaczenie szukanych elementów
             Element fileContentElement = doc.selectFirst(".Box-body .js-file-line-container");
             Elements codeElements = fileContentElement.select(".js-file-line");

             // odczyt i zapis danych
             StringBuilder codeBuilder = new StringBuilder();
             for (Element codeElement : codeElements) {
                 String lineText = codeElement.wholeText();
                 codeBuilder.append(lineText).append("\n");
             }

             code = codeBuilder.toString();

         } catch (IOException e) {
             e.printStackTrace();
         }

         return code;
    }

    static void sendDataToPage(){
        Spark.get("/stream", (request, response) -> {
            response.type("text/event-stream");
            response.header("Cache-Control", "no-cache");
            response.header("Connection", "keep-alive");

            // Wysyłanie danych na strumień w określonych odstępach czasowych
            new Thread(() -> {
                try {
                    while (true) {
                        String message = "Przykładowa wiadomość";
                        response.raw().getOutputStream().println("data: " + message);
                        response.raw().getOutputStream().println();
                        response.raw().getOutputStream().flush();

                        // Opóźnienie między wysyłaniem danych
                        Thread.sleep(2000);
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }).start();

            return response;
        });
    }
}

