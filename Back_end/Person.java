package org.taag.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Person {
	
	private String firstname;
	private String lastname;
	private String email;
	private Integer person_id;
	public String message;
	
//	public Person(String name, String role){
//		this.name = name;
//		this.role = role;
//	}
	@JsonProperty(value = "first_name")
	public String getFirstName() {
		return firstname;
	}
	@JsonProperty(value = "last_name")
	public String getLastName() {
		return lastname;
	}
	public void setFirstName(String firstname) {
		this.firstname = firstname;
	}
	public void setLastName(String lastname) {
		this.lastname=lastname;
	}
	@JsonProperty(value = "Email")
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

}
