package org.taag.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Chart {
	
	Integer chart_id;
	String name;
	String data;
	String message;
	String status;
	
	@JsonProperty(value = "chart_id")
	public Integer getChart_id() {
		return chart_id;
	}
	public void setChart_id(Integer chart_id) {
		this.chart_id = chart_id;
	}
	
	@JsonProperty(value = "name")
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
	@JsonProperty(value = "data")
	public String getData() {
		return data;
	}
	public void setData(String data) {
		this.data = data;
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
