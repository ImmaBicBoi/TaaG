package org.taag.model.DAO;

import java.sql.CallableStatement;
import java.sql.Connection;

import org.taag.connection.JDBCConnection;
import org.taag.model.AttributeJsonDeserialize;
import org.taag.model.AttributeMessages;
import org.taag.model.Person;
import org.taag.model.Position;
import org.taag.model.PreDefinedAttributes;
import org.taag.model.StatusMessage;

public class AttributeDAOImpl implements PreDefinedAttributes{

	AttributeMessages attributeMessages = new AttributeMessages();
	JDBCConnection jdbcConnection = new JDBCConnection();
	Connection connection = jdbcConnection.getConnnection();
	StatusMessage statusMessages = new StatusMessage();
	
	public AttributeMessages createOrUpdateAttribute(AttributeJsonDeserialize attriObj) {
		try {
			CallableStatement cs = connection.prepareCall("call INSERT_ATTRIBUTE(?,?,?,?)");
			
			if(attriObj.getPositions() != null) {
			if(!attriObj.getPositions().isEmpty()) {
				for(Position pos : attriObj.getPositions()) {
//				cs.setInt(1,pos.getAttribute_id());
				cs.setString(1, pos.key);
				cs.setInt(2, pos.order);
				cs.setBoolean(3, pos.getIs_visible());
				cs.setString(4, "Position");
				cs.executeUpdate();
				}
			}
			}
			
			if(attriObj.getPersons() != null) {
			if(!attriObj.getPersons().isEmpty()) {
				for(Person per : attriObj.getPersons()) {
//					cs.setInt(1,per.getAttribute_id());
					cs.setString(1, per.key);
					cs.setInt(2, per.order);
					cs.setBoolean(3, per.getIs_visible());
					cs.setString(4, "Person");
					cs.executeUpdate();
				}
				}
			}

			
			
			attributeMessages.setMessage("attributes saved successfully");
			attributeMessages.setStatus(statusMessages.GetStatus(StatusMessage.status.OK));
			}catch (Exception e) {
				e.printStackTrace();
				attributeMessages.setStatus(statusMessages.GetStatus(StatusMessage.status.ERROR));
				attributeMessages.setMessage("Error: unable to save attributes, missing required parameter");
			}
			return attributeMessages;
	}

	public AttributeMessages getPredefinedAttributes() {
		// TODO Auto-generated method stub
		return null;
	}

	

}
