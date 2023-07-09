package org.example;

import java.sql.*;

public class Database {

    public Database() {
        // Konfiguracja połączenia z bazą danych
        String url = "jdbc:h2:~/test";
        String user = "sa";
        String password = "";

        // Tworzenie połączenia z bazą danych
        try (Connection conn = DriverManager.getConnection(url, user, password);
             Statement stmt = conn.createStatement()) {

            // Tworzenie tabeli "user"
            String sql = "CREATE TABLE user " +
                    "(email VARCHAR(255), " +
                    " password VARCHAR(255), " +
                    " username VARCHAR(255)," +
                    " result VARCHAR(255))";
            stmt.executeUpdate(sql);
            System.out.println("Tabela 'user' została utworzona");

        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }
    }

    public static void dropTable(String tableName) {
        String url = "jdbc:h2:~/test";
        String user = "sa";
        String password = "";

        try (Connection conn = DriverManager.getConnection(url, user, password);
             Statement stmt = conn.createStatement()) {
            String sql = "DROP TABLE " + tableName;
            stmt.executeUpdate(sql);
            System.out.println("Tabela '" + tableName + "' została usunięta");
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }
    }

    // Inne metody i kod

    public static void main(String[] args) {
        Database database = new Database();
        database.dropTable("user");
    }

    public static void addUser(String email, String password, String username) {
        // Konfiguracja połączenia z bazą danych
        String url = "jdbc:h2:~/test";
        String user = "sa";
        String passwordDB = "";

        // Tworzenie połączenia z bazą danych
        try (Connection conn = DriverManager.getConnection(url, user, passwordDB)) {

            // Dodanie użytkownika do tabeli "user"
            String sql = "INSERT INTO user (email, password, username) VALUES (?, ?, ?)";
            PreparedStatement pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, email);
            pstmt.setString(2, password);
            pstmt.setString(3, username);
            pstmt.executeUpdate();
            System.out.println("Dodano użytkownika: " + email);

        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }
    }

    public static void addUserResult(String email, String password, String username, String result) {
        // Konfiguracja połączenia z bazą danych
        String url = "jdbc:h2:~/test";
        String user = "sa";
        String passwordDB = "";

        // Tworzenie połączenia z bazą danych
        try (Connection conn = DriverManager.getConnection(url, user, passwordDB)) {

            // Dodanie użytkownika do tabeli "user"
            String sql = "INSERT INTO user (email, password, username, result) VALUES (?, ?, ?, ?)";
            PreparedStatement pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, email);
            pstmt.setString(2, password);
            pstmt.setString(3, username);
            pstmt.setString(4, result);
            pstmt.executeUpdate();
            System.out.println("Dodano użytkownika: " + email);

        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }
    }

    public static void displayAllUsers() {
        // Konfiguracja połączenia z bazą danych
        String url = "jdbc:h2:~/test";
        String user = "sa";
        String passwordDB = "";

        // Tworzenie połączenia z bazą danych
        try (Connection conn = DriverManager.getConnection(url, user, passwordDB);
             Statement stmt = conn.createStatement()) {

            // Pobieranie wszystkich użytkowników z tabeli "user"
            String sql = "SELECT * FROM user";
            ResultSet rs = stmt.executeQuery(sql);

            // Wyświetlanie informacji o użytkownikach
            while (rs.next()) {
                String email = rs.getString("email");
                String password = rs.getString("password");
                String username = rs.getString("username");
                System.out.println("Email: " + email + ", Password: " + password + ", Username: " + username);
            }

        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }
    }

    public static String getAllRecords() {
        StringBuilder resultBuilder = new StringBuilder();
        String url = "jdbc:h2:~/test";
        String user = "sa";
        String password = "";

        try (Connection conn = DriverManager.getConnection(url, user, password);
             Statement stmt = conn.createStatement()) {
            String sql = "SELECT username, result FROM user";
            ResultSet resultSet = stmt.executeQuery(sql);

            while (resultSet.next()) {
                String username = resultSet.getString("username");
                String result = resultSet.getString("result");
                String record = username + " " + result + "\n";
                resultBuilder.append(record);
            }
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }

        return resultBuilder.toString();
    }

    public static String getAllRecords_() {
        StringBuilder resultBuilder = new StringBuilder();
        String url = "jdbc:h2:~/test";
        String user = "sa";
        String password = "";

        try (Connection conn = DriverManager.getConnection(url, user, password);
             Statement stmt = conn.createStatement()) {
            String sql = "SELECT username FROM user";
            ResultSet resultSet = stmt.executeQuery(sql);

            while (resultSet.next()) {
                String username = resultSet.getString("username");
                String record = username + "\n";
                resultBuilder.append(record);
            }
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }

        return resultBuilder.toString();
    }

    public static String getUsernameAndResultDescending() {
        StringBuilder resultBuilder = new StringBuilder();
        String url = "jdbc:h2:~/test";
        String user = "sa";
        String password = "";

        try (Connection conn = DriverManager.getConnection(url, user, password);
             Statement stmt = conn.createStatement()) {
            String sql = "SELECT username, result FROM user ORDER BY result DESC";
            ResultSet resultSet = stmt.executeQuery(sql);

            while (resultSet.next()) {
                String username = resultSet.getString("username");
                int result = resultSet.getInt("result");
                String record = username + " " + result + "\n";
                resultBuilder.append(record);
            }
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }

        return resultBuilder.toString();
    }

    public static boolean checkUser(String email, String password) {
        // Konfiguracja połączenia z bazą danych
        String url = "jdbc:h2:~/test";
        String user = "sa";
        String passwordDB = "";

        // Tworzenie połączenia z bazą danych
        try (Connection conn = DriverManager.getConnection(url, user, passwordDB)) {

            // Sprawdzenie, czy użytkownik o podanym adresie email i haśle istnieje w tabeli "user"
            String sql = "SELECT * FROM user WHERE email = ? AND password = ?";
            PreparedStatement pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, email);
            pstmt.setString(2, password);
            ResultSet rs = pstmt.executeQuery();
            if (rs.next()) {
                return true;
            }

        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }

        // Jeśli nie znaleziono użytkownika o podanych danych, zwracamy false
        return false;
    }

    public static void resetDatabase() {
        // Konfiguracja połączenia z bazą danych
        String url = "jdbc:h2:~/test";
        String user = "sa";
        String passwordDB = "";

        // Tworzenie połączenia z bazą danych
        try (Connection conn = DriverManager.getConnection(url, user, passwordDB);
             Statement stmt = conn.createStatement()) {

            // Usuwanie wszystkich użytkowników z tabeli "user"
            String sql = "DELETE FROM user";
            stmt.executeUpdate(sql);
            System.out.println("Baza danych została zresetowana");

        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }
    }

    public static boolean checkIfUserExists(String userName) {
        boolean exists = false;
        String url = "jdbc:h2:~/test";
        String user = "sa";
        String password = "";

        try (Connection conn = DriverManager.getConnection(url, user, password);
             Statement stmt = conn.createStatement()) {
            String sql = "SELECT COUNT(*) FROM user WHERE username = '" + userName + "'";
            ResultSet resultSet = stmt.executeQuery(sql);
            resultSet.next();
            int count = resultSet.getInt(1);
            exists = count > 0;
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }

        return !exists;
    }

    public static boolean checkIfEmailExists(String email) {
        boolean exists = false;
        String url = "jdbc:h2:~/test";
        String user = "sa";
        String password = "";

        try (Connection conn = DriverManager.getConnection(url, user, password);
             Statement stmt = conn.createStatement()) {
            String sql = "SELECT COUNT(*) FROM user WHERE email = '" + email + "'";
            ResultSet resultSet = stmt.executeQuery(sql);
            resultSet.next();
            int count = resultSet.getInt(1);
            exists = count > 0;
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }

        return !exists;
    }

    public static String getUsersData() {
        String url = "jdbc:h2:~/test";
        String user = "sa";
        String password = "";
        String userData = "";

        try (Connection conn = DriverManager.getConnection(url, user, password);
             Statement stmt = conn.createStatement()) {

            String sql = "SELECT username, result FROM user ORDER BY CAST(result AS INT) DESC";
            ResultSet rs = stmt.executeQuery(sql);

            while (rs.next()) {
                String username = rs.getString("username");
                String result = rs.getString("result");
                userData += username + " " + result + "\n";
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return userData;
    }

    public static String getUsernameByEmail(String email) {
        String url = "jdbc:h2:~/test";
        String user = "sa";
        String password = "";
        String userData = "";

        try (Connection conn = DriverManager.getConnection(url, user, password);
             Statement stmt = conn.createStatement()) {
            String sql = "SELECT username FROM user WHERE email = '" + email + "'";
            ResultSet rs = stmt.executeQuery(sql);

            if (rs.next()) {
                userData = rs.getString("username");
            }

        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }

        return userData;
    }

    public static String getResultByUsername(String username) {
        String url = "jdbc:h2:~/test";
        String user = "sa";
        String password = "";
        String userData = "";

        try (Connection conn = DriverManager.getConnection(url, user, password);
             Statement stmt = conn.createStatement()) {
            String sql = "SELECT result FROM user WHERE username = '" + username + "'";
            ResultSet rs = stmt.executeQuery(sql);

            if (rs.next()) {
                userData = rs.getString("result");
            }

        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }

        return userData;
    }

    public static void updateResultByUsername(String username, String result) {
        String url = "jdbc:h2:~/test";
        String user = "sa";
        String password = "";
        String userData = "";

        try (Connection conn = DriverManager.getConnection(url, user, password);
             Statement stmt = conn.createStatement()) {
            String sql = "UPDATE user SET result = '" + result + "' WHERE username = '" + username + "'";
            stmt.executeUpdate(sql);
            System.out.println("Updated result for username " + username + ": " + result);

        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }
    }





}
