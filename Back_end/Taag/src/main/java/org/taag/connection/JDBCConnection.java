package org.taag.connection;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.logging.*;

public class JDBCConnection {

	public Connection getConnnection() {
		Connection connection = null;

		try {
			String connectionURL = "jdbc:mysql://localhost:3306/orgchartdb";
			String connectionUser = "root";
			String connectionPass = "root";
			
			if (System.getenv("DOCKER_CHECK").equals("1")) {
				//Running in docker use docker specific connection information
				connectionURL = "jdbc:mysql://database:3306/orgchartdb";
				connectionUser = "webapp";
				connectionPass = "taag";
			} else if (System.getenv("SAM_CHECK").equals("1")) {
				//Running on a machine that wants to use webapp user and localhost
				connectionURL = "jdbc:mysql://localhost:3306/orgchartdb";
				connectionUser = "webapp";
				connectionPass = "taag";
			}
			
			Logger.getLogger (JDBCConnection.class.getName()).log(Level.INFO, "Attempting to connect to the database:\nconnectionURL='"+connectionURL+"'\nconnectionUser='"+connectionUser+"'\nconnectionPass='"+connectionPass+"'");
			
			Class.forName("com.mysql.jdbc.Driver").newInstance();
			connection = DriverManager.getConnection(connectionURL, connectionUser, connectionPass);

		} catch (InstantiationException e) {
			Logger.getLogger (JDBCConnection.class.getName()).log(Level.SEVERE, e.getMessage(), e);
		} catch (IllegalAccessException e2) {
			Logger.getLogger (JDBCConnection.class.getName()).log(Level.SEVERE, e2.getMessage(), e2);
		} catch (ClassNotFoundException e3) {
			Logger.getLogger (JDBCConnection.class.getName()).log(Level.SEVERE, e3.getMessage(), e3);
		} catch (SQLException e4) {
			Logger.getLogger (JDBCConnection.class.getName()).log(Level.SEVERE, e4.getMessage(), e4);
		}

		return connection;
	}

}
