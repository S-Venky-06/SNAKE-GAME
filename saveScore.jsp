<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.sql.*" %>
<%@ page import="java.io.*" %>
<%

// Get the parameters from the request
String scoreStr = request.getParameter("score");
String playerName = request.getParameter("playerName");
int score = 0;

// Initialize response message
String message = "";

try {
    // Validate input
    if (scoreStr == null || scoreStr.trim().isEmpty()) {
        throw new IllegalArgumentException("Score is required");
    }
    if (playerName == null || playerName.trim().isEmpty()) {
        throw new IllegalArgumentException("Player name is required");
    }
    
    // Parse the score as an integer
    score = Integer.parseInt(scoreStr);
    
    // Database connection parameters
    String jdbcUrl = "jdbc:mysql://localhost:3306/game_db";
    String dbUser = "venky";
    String dbPassword = "2006";
    
    Connection conn = null;
    PreparedStatement pstmt = null;
    
    try {
        // Load the JDBC driver
        Class.forName("com.mysql.jdbc.Driver");
        
        // Establish database connection
        conn = DriverManager.getConnection(jdbcUrl, dbUser, dbPassword);
        
        // Create SQL statement to insert score with player name and user_id
        String sql = "INSERT INTO scores (score, player_name, user_id, created_at) VALUES (?, ?, 1, NOW())";
        pstmt = conn.prepareStatement(sql);
        
        // Set parameters
        pstmt.setInt(1, score);
        pstmt.setString(2, playerName);
        // Using 1 as default user_id (guest user)
        
        // Execute the statement
        int rowsAffected = pstmt.executeUpdate();
        
        if (rowsAffected > 0) {
            message = "Score saved successfully";
        } else {
            message = "Failed to save score";
        }
        
    } catch (ClassNotFoundException e) {
        message = "Database driver not found";
        e.printStackTrace();
    } catch (SQLException e) {
        message = "Database error: " + e.getMessage();
        e.printStackTrace();
    } finally {
        // Close resources
        if (pstmt != null) try { pstmt.close(); } catch (SQLException e) { e.printStackTrace(); }
        if (conn != null) try { conn.close(); } catch (SQLException e) { e.printStackTrace(); }
    }
    
} catch (NumberFormatException e) {
    message = "Invalid score format";
    e.printStackTrace();
} catch (IllegalArgumentException e) {
    message = e.getMessage();
    e.printStackTrace();
}

// Output the result
out.println(message);
%>