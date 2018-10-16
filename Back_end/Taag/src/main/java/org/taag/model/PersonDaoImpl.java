package org.taag.model.DAO;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.taag.connection.JDBCConnection;
import org.taag.model.Person;
import org.taag.model.PersonMessages;
import org.taag.model.Position;
import org.taag.model.PositionMessages;
import org.taag.model.StatusMessages;

public class PersonDaoImpl {
	
	// List personData = new ArrayList();
	
			JDBCConnection jdbcConnection = new JDBCConnection();
			Connection connection = jdbcConnection.getConnnection();
			StatusMessages statusMessage=new StatusMessages();

	public PersonMessages createPerson(Person person) {
		PersonMessages personMessages=new PersonMessages();
		if (person.getPersonID() != 0) {
			Boolean exists = checkPersonId(person.getPersonID());
			if (exists == true) {
				
				personMessages.setMessage(statusMessage.GetStatus(StatusMessages.status.ERROR));
				} 
		} else {
			createPersonDBConn(person, personMessages);
		}

		return personMessages;
	}

	public void createPersonDBConn(Person person, PersonMessages personMessage){

		try {
			PreparedStatement ps = connection.prepareStatement("insert into person values (?,?,?,?)");
			ps.setInt(1, person.getPersonID());
			ps.setString(2, person.getFirstName());
			ps.setString(3, person.getLastName());
			ps.setString(4, person.getEmail());
			ps.executeUpdate();
		}

		catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}
	public PersonMessages updatePerson(Person person, int personId) {
		PersonMessages personMessages = new PersonMessages();
		Boolean personExists = checkPersonId(personId);
		if (personExists) {
			if (person.getPersonID() != 0) {
				Boolean exists = checkPersonId(person.getPersonID());
					if (exists == true) {
						
						personMessages.setMessage(statusMessage.GetStatus(StatusMessages.status.ERROR));
						
			} else {
				updatePersonDBConn(person, personId, personMessages);
			}

		} else {
//			positionMessages.setStatus("Failed");
			personMessages.setMessage(statusMessage.GetStatus(StatusMessages.status.NOCONTENT));
		}
		}
		return personMessages;
	}

	private void updatePersonDBConn(Person person, int personID, PersonMessages personMessages) {
		try {
			PreparedStatement ps = connection.prepareStatement("call UPDATE_POSITION( " + "'" + personID + "','"
					+ person.getFirstName() + "','" + person.getLastName() + "','" + person.getEmail() + "')");

			ps.executeUpdate();

//			positionMessages.setStatus("success");
			personMessages.setMessage(statusMessage.GetStatus(StatusMessages.status.OK));

			person.setPersonID(getPersonId(person.getEmail()));
			personMessages.setPerson(person);
		} catch (SQLException e) {
//			positionMessages.setStatus("Failed");
			personMessages.setMessage(statusMessage.GetStatus(StatusMessages.status.ERROR));
			e.printStackTrace();
		}

	}


	public Person getPerson(int personId) {
		Person person = new Person();
		Boolean exists = checkPersonId(personId);
		try { 
		PreparedStatement ps = connection.prepareStatement("call RETRIEVE_POSITION('" + personId + "')");
		ResultSet rs = ps.executeQuery();
		if (exists) {
			
			while (rs.next()) {
				person.setPersonID(rs.getInt("person_id"));
				person.setFirstName(rs.getString("person_fname"));
				person.setLastName(rs.getString("person_lname"));
				person.setEmail(rs.getString("email"));
				
				// personData.add(person);

			}
		}
		else {
			person.setMessage(statusMessage.GetStatus(StatusMessages.status.NOCONTENT));
		}
			rs.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return person;
			
	}
	
	public PersonMessages deletePerson(int personId) {
		PersonMessages personMessages = new PersonMessages();
		try {

			Boolean exists = checkPersonId(personId);
			if (exists) {
				PreparedStatement ps = connection.prepareStatement("call DELETE_PERSON('" + personId + "')");

				ps.executeUpdate();

//				positionMessages.setStatus("success");
				personMessages.setMessage(statusMessage.GetStatus(StatusMessages.status.OK));

			} else {
//				positionMessages.setStatus("Failed");
				personMessages.setMessage(statusMessage.GetStatus(StatusMessages.status.NOCONTENT));
			}

		}

		catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return personMessages;

	}
	public PersonMessages getAllPersons() {
		List<Person> persons = new ArrayList<Person>();
		PersonMessages personMessages = new PersonMessages();

		try {
			PreparedStatement ps = connection.prepareStatement("call RETRIEVE_ALL_PERSONS");
			ResultSet rs = ps.executeQuery();
			while (rs.next()) {
				Person person = new Person();
				person.setPersonID(rs.getInt("person_id"));
				person.setFirstName(rs.getString("person_fname"));
				person.setLastName(rs.getString("person_lname"));
				person.setEmail(rs.getString("email"));
//				positionMessages.setStatus("success");
				personMessages.setMessage(statusMessage.GetStatus(StatusMessages.status.OK));
				persons.add(person);
				personMessages.setPersons(persons);

			}

			rs.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return personMessages;
	}
	private Boolean checkPersonId(Integer positionID) {
		Boolean exists = false;
		try {
			if (positionID != 0) {
				PreparedStatement ps = connection
						.prepareStatement("select * from PERSON where PERSON_ID=" + "'" + positionID + "'");
				ResultSet rs = ps.executeQuery();
				while (rs.next()) {

					exists = true;

				}
				rs.close();
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return exists;
	}
	public int getPersonId(String personEmail) {
		int positionID = 0;
		try {

			PreparedStatement ps = connection.prepareStatement(
					"select PERSON_ID from PERSON where EMAIL = " + "'" + personEmail + "'");
			ResultSet rs = ps.executeQuery();

			while (rs.next()) {
				positionID = rs.getInt("PERSON_ID");

			}
			rs.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return positionID;
	}

}
