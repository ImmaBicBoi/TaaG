package org.taag.model.DAO;

import org.taag.model.Person;
import org.taag.model.PersonMessages;
import org.taag.model.Persons;

public class PersonDAO implements Persons {

	PersonDaoImpl daoImpl = new PersonDaoImpl();

	public PersonMessages createPerson(Person psn) {
		PersonMessages PersonMessages;
		if(psn.getPersonID() == null) {
			psn.setPersonID(0);
		}
		 PersonMessages = daoImpl.createPerson(psn);
		return PersonMessages;
	}

	public PersonMessages updatePerson(Person psn, int PersonId) {
		if(psn.getPersonID() == null) {
			psn.setPersonID(0);
		}
		PersonMessages PersonMessages = daoImpl.updatePerson(psn, PersonId);
		return PersonMessages;
	}

	public Person getPerson(int PersonId) {
		Person psn = daoImpl.getPerson(PersonId);
		return psn;
	}

	public PersonMessages deletePerson(int PersonId) {
		PersonMessages PersonMessages = daoImpl.deletePerson(PersonId);
		return PersonMessages;

	}

	public PersonMessages getAllPersons() {
		PersonMessages PersonMessages = daoImpl.getAllPersons();
		return PersonMessages;
	}

	public void addPerson(Person p) {
		// TODO Auto-generated method stub
		
	}

	public Person getPerson() {
		// TODO Auto-generated method stub
		return null;
	}


}
