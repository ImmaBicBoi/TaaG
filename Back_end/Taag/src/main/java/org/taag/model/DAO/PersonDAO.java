package org.taag.model.DAO;

import org.taag.model.Person;
import org.taag.model.Persons;

public class PersonDAO implements Persons {

	PersonDaoImpl pImpl = new PersonDaoImpl();

	public void addPerson(Person p) {

		pImpl.setPersonDetails(p);

	}

	public Person getPerson() {
		Person p = pImpl.getPerson();
		return p;
	}

}
