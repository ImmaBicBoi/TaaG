package org.taag.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class AttributeMessages {


	public String message;
	public String status;
	public List<Person> person;
	public List<Position> position;
	

	@JsonProperty(value = "message")
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	
	@JsonIgnore
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	
	@JsonProperty(value = "person")
	public List<Person> getPerson() {
		return person;
	}
	public void setPerson(List<Person> person) {
		this.person = person;
	}
	
	@JsonProperty(value = "position")
	public List<Position> getPosition() {
		return position;
	}
	public void setPosition(List<Position> position) {
		this.position = position;
	}
	
	
	
	
}
