package org.taag.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Person {
	
	private String firstName;
	private String lastName;
	private String email;
	private Integer person_id;
	public String message;
	public String status;
	

	@JsonProperty(value = "first_name")
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstname) {
		this.firstName = firstname;
	}
	
	
	@JsonProperty(value = "last_name")
	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastname) {
		this.lastName=lastname;
	}
	
	
	@JsonProperty(value = "email")
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	
	
	@JsonProperty(value = "person_id")
	public Integer getPersonID() {
		return person_id;
	}
	public void setPersonID(Integer person_id) {
		this.person_id = person_id;
	}
	
	
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
	
	

}
