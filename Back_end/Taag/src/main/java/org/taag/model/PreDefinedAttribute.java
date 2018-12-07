//package org.taag.model;
//
//import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
//import com.fasterxml.jackson.annotation.JsonProperty;
//
//@JsonIgnoreProperties(ignoreUnknown = true)
//public class PreDefinedAttribute {
//
//	public Integer attribute_id;
//	public String key;
//	public Integer order;
//	public Boolean is_visible;
//	
//	@JsonProperty(value = "attribute_id")
//	public Integer getAttribute_id() {
//		return attribute_id;
//	}
//	public void setAttribute_id(Integer attribute_id) {
//		this.attribute_id = attribute_id;
//	}
//	
//	@JsonProperty(value = "key")
//	public String getKey() {
//		return key;
//	}
//	public void setKey(String key) {
//		this.key = key;
//	}
//	
//	@JsonProperty(value = "order")
//	public Integer getOrder() {
//		return order;
//	}
//	public void setOrder(Integer order) {
//		this.order = order;
//	}
//	
//	@JsonProperty(value = "is_visible")
//	public Boolean getIs_visible() {
//		return is_visible;
//	}
//	public void setIs_visible(Boolean is_visible) {
//		this.is_visible = is_visible;
//	}
//	
//	
//	
//}
