package org.taag.connection;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;

public class JDBCConnection {

	public Connection getConnnection() {
		Connection connection = null;

		try {
			String connectionURL = "jdbc:mysql://localhost:3306/orgchartdb?useUnicode=true&useJDBCCompliantTimezoneShift=true&useLegacyDatetimeCode=false&serverTimezone=UTC";
			 String connectionUser = "root";
	         String connectionPass = "root";
	         
	         Logger.getLogger (JDBCConnection.class.getName()).log(Level.INFO, "Attempting to connect to the database:\nconnectionURL='"+
	        		 connectionURL+"'\nconnectionUser='"+connectionUser+"'\nconnectionPass='"+connectionPass+"'");
			
			Class.forName("com.mysql.jdbc.Driver").newInstance();
			connection = DriverManager.getConnection(connectionURL, connectionUser, connectionPass);

		} catch (InstantiationException e) {
			e.getLocalizedMessage();

		} catch (IllegalAccessException e2) {
			e2.getLocalizedMessage();
		} catch (ClassNotFoundException e3) {
			e3.getLocalizedMessage();
		} catch (SQLException e4) {
			e4.getLocalizedMessage();
		}

		return connection;
	}

}