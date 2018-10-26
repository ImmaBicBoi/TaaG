package org.taag.model;

import java.util.HashMap;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.sun.org.apache.bcel.internal.classfile.Attribute;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Position {

	public String name;
	public Integer position_id;
	public Integer person_id;
	public Integer parent_position_id;
	public String status;
	public String message;
	public String job_id;
	public List<Attributes> attribute;

	@JsonProperty(value = "name")
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}


	@JsonProperty(value = "position_id")
	public Integer getPositionID() {
		return position_id;
	}

	public void setPositionID(Integer position_id) {
		this.position_id = position_id;
	}
	
	@JsonProperty(value = "person_id")
	 public Integer getPersonID() {
	 return person_id;
	 }
	 public void setPersonID(Integer person_id) {
	 this.person_id = person_id;
	 }

	@JsonProperty(value = "parent_position_id")
	public Integer getParentPositionID() {
		return parent_position_id;
	}

	public void setParentPositionID(Integer parent_position_id) {
		this.parent_position_id = parent_position_id;
	}

	@JsonIgnore
	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	@JsonProperty(value = "message")
	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	@JsonProperty(value = "job_id")
	public String getJobId() {
		return job_id;
	}

	public void setJobId(String job_id) {
		this.job_id = job_id;
	}

	@JsonProperty(value = "attributes")
	public List<Attributes> getAttribute() {
		return attribute;
	}

	public void setAttribute(List<Attributes> attribute) {
		this.attribute = attribute;
	}

	
	
	
	

}
