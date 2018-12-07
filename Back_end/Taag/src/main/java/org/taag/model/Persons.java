package org.taag.model;

public interface Persons {

	public PersonMessages createPerson(Person person);

	public PersonMessages updatePerson(Person person, int personId);

	public Person getPerson(int personId);

	public PersonMessages deletePerson(int personId);

	public PersonMessages getAllPersons();
	
	public PersonMessages getAllPersonsAttributes();
}
