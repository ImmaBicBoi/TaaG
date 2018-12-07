package org.taag.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

public class AttributeJsonDeserialize {

	List<Position> positions;
	List<Person> persons;
	
	@JsonProperty(value = "position")
	public List<Position> getPositions() {
		return positions;
	}
	public void setPositions(List<Position> positions) {
		this.positions = positions;
	}
	
	
	@JsonProperty(value = "person")
	public List<Person> getPersons() {
		return persons;
	}
	public void setPersons(List<Person> persons) {
		this.persons = persons;
	}
	
	
	
}
