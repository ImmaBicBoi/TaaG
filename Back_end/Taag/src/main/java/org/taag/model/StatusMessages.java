package org.taag.model;

public class StatusMessages {
	
	public enum status{
		OK,
		CREATED,
		NOCONTENT,
		NOTFOUND,
		ERROR
	}
	
	public String GetStatus(status status) {
		
		switch(status) {
		
		case OK:
			return "200"; //Request successful
		case CREATED:
			return "201"; //Content created successfully
		case NOCONTENT:
			return "204"; //Empty response
		case NOTFOUND:
			return "404"; //Resource doesn’t exist
		case ERROR:
			return "400"; //Invalid/Malformed request
		default:
			return "406";
		
		}
		
	}

}
