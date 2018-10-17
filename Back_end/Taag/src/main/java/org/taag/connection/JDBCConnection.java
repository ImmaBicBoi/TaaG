package org.taag.connection;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

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
			}
			
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