<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.sql.*" %>
<%@ page import="java.util.*" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Score History</title>
    <style>
        /* Base Styles */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        body {
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background-color: #0f172a;
            background-image: radial-gradient(circle at 10% 20%, #1e293b 0%, #0f172a 100%);
            color: #e2e8f0;
        }
        
        /* Score History Container */
        .container {
            position: relative;
            width: 90%;
            max-width: 800px;
            padding: 20px;
            border-radius: 16px;
            background-color: #1e293b;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3), 0 0 40px rgba(76, 175, 80, 0.2);
            display: flex;
            flex-direction: column;
            align-items: center;
            margin: 30px 0;
        }
        
        /* Score History Title */
        h1 {
            color: #4ade80;
            font-size: 32px;
            margin-bottom: 20px;
            text-shadow: 0 0 10px rgba(76, 175, 80, 0.5);
            letter-spacing: 2px;
            text-transform: uppercase;
            font-weight: bold;
            text-align: center;
        }
        
        /* Score Table */
        .score-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            border-radius: 8px;
            overflow: hidden;
            font-family: monospace;
        }
        
        .score-table th {
            background-color: #334155;
            color: #e2e8f0;
            padding: 12px 15px;
            text-align: left;
            font-weight: bold;
            border-bottom: 2px solid #4ade80;
        }
        
        .score-table td {
            padding: 10px 15px;
            border-bottom: 1px solid #334155;
            color: #cbd5e1;
        }
        
        .score-table tr:nth-child(even) {
            background-color: #1e293b;
        }
        
        .score-table tr:nth-child(odd) {
            background-color: #263549;
        }
        
        .score-table tr:hover {
            background-color: #334155;
        }
        
        /* Table Header */
        .table-header {
            text-align: center;
            padding: 8px 0;
            background-color: #334155;
            color: #4ade80;
            font-weight: bold;
            border-left: 4px solid #4ade80;
            border-right: 4px solid #4ade80;
        }
        
        /* Back Button */
        .back-button {
            background-color: #4ade80;
            border: none;
            color: #0f172a;
            padding: 12px 24px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 18px;
            margin: 10px 2px;
            cursor: pointer;
            border-radius: 8px;
            font-weight: bold;
            transition: all 0.2s ease;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        .back-button:hover {
            background-color: #22c55e;
            transform: translateY(-2px);
            box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
        }
        
        .back-button:active {
            transform: translateY(0);
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        /* Score value styling */
        .score-value {
            color: #4ade80;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Score History</h1>
        
        <table class="score-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Score</th>
                    <th>Player Name</th>
                    <th>User ID</th>
                    <th>Date & Time</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td colspan="5" class="table-header">
                        
                    </td>
                </tr>
                <%
                // Database connection parameters
                String jdbcUrl = "jdbc:mysql://localhost:3306/game_db";
                String dbUser = "venky";
                String dbPassword = "2006";
                
                Connection conn = null;
                PreparedStatement pstmt = null;
                ResultSet rs = null;
                
                try {
                    // Load the JDBC driver
                    Class.forName("com.mysql.jdbc.Driver");
                    
                    // Establish database connection
                    conn = DriverManager.getConnection(jdbcUrl, dbUser, dbPassword);
                    
                    // Create SQL statement to get scores
                    String sql = "SELECT id, score, player_name, user_id, created_at FROM scores ORDER BY id ASC";
                    pstmt = conn.prepareStatement(sql);
                    
                    // Execute the query
                    rs = pstmt.executeQuery();
                    
                    boolean hasRecords = false;
                    
                    while (rs.next()) {
                        hasRecords = true;
                        int id = rs.getInt("id");
                        int score = rs.getInt("score");
                        String playerName = rs.getString("player_name");
                        if (playerName == null) playerName = "";
                        int userId = rs.getInt("user_id");
                        Timestamp createdAt = rs.getTimestamp("created_at");
                %>
                        <tr>
                            <td><%= id %></td>
                            <td class="score-value"><%= score %></td>
                            <td><%= playerName %></td>
                            <td><%= userId %></td>
                            <td><%= createdAt %></td>
                        </tr>
                <%
                    }
                    
                    if (!hasRecords) {
                        // Only show this if there are truly no records
                %>
                        <tr>
                            <td colspan="5" style="text-align: center; padding: 20px;">No scores found</td>
                        </tr>
                <%
                    }
                    
                } catch (ClassNotFoundException e) {
                    out.println("<tr><td colspan='5' style='text-align: center; padding: 20px; color: #ef4444;'>Database driver not found: " + e.getMessage() + "</td></tr>");
                    e.printStackTrace();
                } catch (SQLException e) {
                    out.println("<tr><td colspan='5' style='text-align: center; padding: 20px; color: #ef4444;'>Database error: " + e.getMessage() + "</td></tr>");
                    e.printStackTrace();
                } finally {
                    // Close resources
                    if (rs != null) try { rs.close(); } catch (SQLException e) { e.printStackTrace(); }
                    if (pstmt != null) try { pstmt.close(); } catch (SQLException e) { e.printStackTrace(); }
                    if (conn != null) try { conn.close(); } catch (SQLException e) { e.printStackTrace(); }
                }
                %>
                <tr>
                    <td colspan="5" class="table-header">
                        
                    </td>
                </tr>
            </tbody>
        </table>
        
        <a href="index.jsp" class="back-button">Back to Game</a>
    </div>
</body>
</html>