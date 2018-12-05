package org.taag.model.DAO;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.taag.connection.JDBCConnection;
import org.taag.model.Attributes;
import org.taag.model.Person;
import org.taag.model.PersonMessages;
import org.taag.model.StatusMessage;

public class PersonDaoImpl {
	
			JDBCConnection jdbcConnection = new JDBCConnection();
			Connection connection = jdbcConnection.getConnnection();
			StatusMessage statusMessages = new StatusMessage();

	public PersonMessages createPerson(Person person) {
		PersonMessages personMessages=new PersonMessages();
			Boolean exists = checkPerson(person);
			if (exists == true) {
				personMessages.setMessage("Person already exists");
				personMessages.setStatus(statusMessages.GetStatus(StatusMessage.status.NOCONTENT));
				} else {
					try {
						CallableStatement cs = connection.prepareCall("call CREATE_PERSON (?,?,?,?)");
						cs.setString(1, person.getFirstName());
						cs.setString(2, person.getLastName());
						cs.setString(3, person.getEmployee_id());
						cs.registerOutParameter(4, java.sql.Types.INTEGER);
						cs.executeUpdate();
						int personId = cs.getInt(4);
						
						person.setPersonID(personId);
						
						if(person.getAttribute() != null) {
							List<Attributes> attributes = person.getAttribute();
							
							for(Attributes attri : attributes) {
								cs = connection.prepareCall("call CREATE_PERSON_ATTR (?,?,?)");
								cs.setString(1, attri.getKey());
								cs.setString(2, attri.getValue());
								cs.setInt(3, personId);
								cs.executeUpdate();
							}
							
							}
							
						
						personMessages.setPerson(person);
						personMessages.setMessage("Person created successfully");
						personMessages.setStatus(statusMessages.GetStatus(StatusMessage.status.OK));
					}

					catch (SQLException e) {
						e.printStackTrace();
						personMessages.setStatus(statusMessages.GetStatus(StatusMessage.status.ERROR));
						personMessages.setMessage("Error: unable to create person, missing required parameter");
					}

				}

		return personMessages;
	}


	


	public PersonMessages updatePerson(Person person, int personId) {
		PersonMessages personMessages = new PersonMessages();
		String EmployeeId = null;
			Boolean exists = checkPersonId(personId);
			  
			if (person.getEmployee_id() == null) {
					 EmployeeId = getEmployeeId(personId);
				 }
			   else {
				    EmployeeId = person.getEmployee_id();
			   }
				
					if (exists == true) {
						
						try {
							PreparedStatement ps = connection.prepareStatement("call UPDATE_PERSON( " + "'" + personId + "','"
									+ person.getFirstName() + "','" + person.getLastName() + "','" + EmployeeId + "')");

							ps.executeUpdate();
							
							ps = connection.prepareStatement("call DELETE_PERSON_ATTR(?)");
							ps.setInt(1, personId);
							ps.executeUpdate();
							
							if(person.getAttribute() != null) {
								List<Attributes> attributes = person.getAttribute();
								
								for(Attributes attri : attributes) {
									ps = connection.prepareCall("call CREATE_PERSON_ATTR (?,?,?)");
									ps.setString(1, attri.getKey());
									ps.setString(2, attri.getValue());
									ps.setInt(3, personId);
									ps.executeUpdate();
								}
								}
							
							ps.close();
							
                            personMessages.setMessage("Person updated successfully");
							personMessages.setStatus(statusMessages.GetStatus(StatusMessage.status.OK));

							person.setPersonID(personId);
							personMessages.setPerson(person);
						} catch (SQLException e) {
							personMessages.setStatus(statusMessages.GetStatus(StatusMessage.status.ERROR));
							e.printStackTrace();
						}
						
			} else {
				personMessages.setMessage("Error: person with provided id does not exist");
				personMessages.setStatus(statusMessages.GetStatus(StatusMessage.status.NOCONTENT));
			}

		
		return personMessages;
	}

	
	public Person getPerson(int personId) {
		Person person = new Person();
		List<Attributes> attributes = new ArrayList<Attributes>();
		Boolean exists = checkPersonId(personId);
		try { 
		PreparedStatement ps = connection.prepareStatement("call RETRIEVE_PERSON('" + personId + "')");
		ResultSet rs = ps.executeQuery();
		if (exists) {
			
			while (rs.next()) {
				person.setPersonID(rs.getInt("PERSON_ID"));
				person.setFirstName(rs.getString("PERSON_FNAME"));
				person.setLastName(rs.getString("PERSON_LNAME"));
				person.setEmployee_id(rs.getString("EMPLOYEE_ID"));
				person.setMessage("Person retrieved successfully");
				person.setStatus(statusMessages.GetStatus(StatusMessage.status.OK));
			}
			
			
			ps = connection.prepareStatement("call RETRIEVE_PERSON_ATTR('" + personId + "')");
			rs = ps.executeQuery();
			while (rs.next()) {
				Attributes attribute = new Attributes();
				attribute.setKey(rs.getString("PER_ATTR_KEY"));
				attribute.setValue(rs.getString("PER_ATTR_VALUE"));
				attributes.add(attribute);
			}
			person.setAttribute(attributes);
		}
		else {
			person.setMessage("Error: person with provided id does not exist");
			person.setStatus(statusMessages.GetStatus(StatusMessage.status.NOCONTENT));
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
                personMessages.setMessage("Person deleted successfully");
				personMessages.setStatus(statusMessages.GetStatus(StatusMessage.status.OK));
				
				ps = connection.prepareStatement("call DELETE_PERSON_ATTR(?)");
				ps.setInt(1, personId);
				ps.executeUpdate();
				ps.close();

			} else {
				personMessages.setMessage("Error person with provided id does not exist");
				personMessages.setStatus(statusMessages.GetStatus(StatusMessage.status.NOCONTENT));
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
			PreparedStatement ps = connection.prepareStatement("call RETRIEVE_ALL_PEOPLE");
			ResultSet rs = ps.executeQuery();
			while (rs.next()) {
				Person person = new Person();
				person.setPersonID(rs.getInt("PERSON_ID"));
				person.setFirstName(rs.getString("PERSON_FNAME"));
				person.setLastName(rs.getString("PERSON_LNAME"));
				person.setEmployee_id(rs.getString("EMPLOYEE_ID"));
				personMessages.setStatus(statusMessages.GetStatus(StatusMessage.status.OK));
				personMessages.setMessage("Persons retrieved successfully");
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
	
	
	private Boolean checkPerson(Person person) {
		Boolean exists = false;
		try {

			PreparedStatement ps = connection.prepareStatement(
					"select PERSON_ID from PERSON where EMPLOYEE_ID = " + "'" + person.getEmployee_id() + "'");
			ResultSet rs = ps.executeQuery();

			while (rs.next()) {
				exists = true;

			}
			rs.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return exists;
	}
	
	private Boolean checkPersonId(Integer personID) {
		Boolean exists = false;
		try {
			if (personID != 0) {
				PreparedStatement ps = connection
						.prepareStatement("select * from PERSON where PERSON_ID=" + "'" + personID + "'");
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
	public String getEmployeeId(Integer personID) {
		String employeeID = null ;
		try {

			PreparedStatement ps = connection.prepareStatement(
					"select EMPLOYEE_ID from PERSON where PERSON_ID = " + "'" + personID + "'");
			ResultSet rs = ps.executeQuery();

			while (rs.next()) {
				employeeID = rs.getString("EMPLOYEE_ID");

			}
			rs.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return employeeID;
	}

}
