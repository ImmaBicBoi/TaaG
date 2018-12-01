package org.taag.model.DAO;

import java.util.List;

import org.taag.model.AttributeJsonDeserialize;
import org.taag.model.AttributeMessages;
import org.taag.model.Person;
import org.taag.model.Position;
import org.taag.model.PreDefinedAttributes;

public class AttributeDAO implements PreDefinedAttributes{
	
    AttributeDAOImpl attributeDAOImpl = new AttributeDAOImpl();
    
	public AttributeMessages createOrUpdateAttribute(AttributeJsonDeserialize attriObj) {
		AttributeMessages attributeMessages = attributeDAOImpl.createOrUpdateAttribute(attriObj);
		return attributeMessages;
	}

	public AttributeMessages getPredefinedAttributes() {
		// TODO Auto-generated method stub
		return null;
	}

	

}
