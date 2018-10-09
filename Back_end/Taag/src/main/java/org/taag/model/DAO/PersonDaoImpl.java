package org.taag.model.DAO;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.taag.connection.JDBCConnection;
import org.taag.model.Person;

public class PersonDaoImpl {

	public void setPersonDetails(Person person) {

		// List personData = new ArrayList();
		JDBCConnection jdbcConnection = new JDBCConnection();

		Connection connection = jdbcConnection.getConnnection();
		if (connection == null) {
			System.out.println("connection is null");
		}

		try {
			PreparedStatement ps = connection.prepareStatement("insert into person values (?,?)");
			ps.setString(1, person.getName());
			ps.setString(2, person.getRole());
			ps.executeUpdate();
		}

		catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

	public Person getPerson() {

		// List personData = new ArrayList();
		JDBCConnection jdbcConnection = new JDBCConnection();
		Person person = new Person();

		Connection connection = jdbcConnection.getConnnection();
		if (connection == null) {
			System.out.println("connection is null");
		}

		try {
			PreparedStatement ps = connection.prepareStatement("select name,role from person");
			ResultSet rs = ps.executeQuery();
			System.out.println("getting values");
			while (rs.next()) {
				
				person.setName(rs.getString("name"));
				person.setRole(rs.getString("role"));
				
				// personData.add(person);

			}
			rs.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return person;
	}

}
