package org.taag.model.DAO;

import org.taag.model.Person;
import org.taag.model.PersonMessages;
import org.taag.model.Persons;

public class PersonDAO implements Persons {

	PersonDaoImpl daoImpl = new PersonDaoImpl();

	public PersonMessages createPerson(Person psn) {
		PersonMessages PersonMessages;
		 PersonMessages = daoImpl.createPerson(psn);
		return PersonMessages;
	}

	public PersonMessages updatePerson(Person psn, int PersonId) {
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

	


}
