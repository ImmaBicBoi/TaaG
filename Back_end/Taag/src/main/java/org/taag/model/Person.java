package org.taag.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Person {
	
	private String firstName;
	private String lastName;
	private Integer person_id;
	private String employee_id;
	public String message;
	public String status;
	public List<Attributes> attribute;
//	public PreDefinedAttribute preDefinedAttribute;
	public Integer attribute_id;
	public String key;
	public Integer order;
	public Boolean is_visible;
	public String type;
	

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
	

	
	@JsonProperty(value = "person_id")
	public Integer getPersonID() {
		return person_id;
	}
	public void setPersonID(Integer person_id) {
		this.person_id = person_id;
	}
	
	
	
	@JsonProperty(value = "employee_id")
	public String getEmployee_id() {
		return employee_id;
	}
	public void setEmployee_id(String employee_id) {
		this.employee_id = employee_id;
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
	
	@JsonProperty(value = "attributes")
	public List<Attributes> getAttribute() {
		return attribute;
	}

	public void setAttribute(List<Attributes> attribute) {
		this.attribute = attribute;
	}
	
//	@JsonIgnore
//	public PreDefinedAttribute getPreDefinedAttribute() {
//		return preDefinedAttribute;
//	}
//	public void setPreDefinedAttribute(PreDefinedAttribute preDefinedAttribute) {
//		this.preDefinedAttribute = preDefinedAttribute;
//	}

	
	@JsonProperty(value = "attribute_id")
	public Integer getAttribute_id() {
		return attribute_id;
	}
	public void setAttribute_id(Integer attribute_id) {
		this.attribute_id = attribute_id;
	}
	
	@JsonProperty(value = "key")
	public String getKey() {
		return key;
	}
	public void setKey(String key) {
		this.key = key;
	}
	
	@JsonProperty(value = "order")
	public Integer getOrder() {
		return order;
	}
	public void setOrder(Integer order) {
		this.order = order;
	}
	
	@JsonProperty(value = "is_visible")
	public Boolean getIs_visible() {
		return is_visible;
	}
	public void setIs_visible(Boolean is_visible) {
		this.is_visible = is_visible;
	}
	
	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}
	
	

}
