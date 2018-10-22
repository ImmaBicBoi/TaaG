import com.fasterxml.jackson.annotation.JsonProperty;

public class Attributes {
	
	public String key;
	public String value;
	
	
	@JsonProperty(value = "key")
	public String getKey() {
		return key;
	}
	public void setKey(String key) {
		this.key = key;
	}
	
	@JsonProperty(value = "value")
	public String getValue() {
		return value;
	}
	public void setValue(String value) {
		this.value = value;
	}
	
	

}
