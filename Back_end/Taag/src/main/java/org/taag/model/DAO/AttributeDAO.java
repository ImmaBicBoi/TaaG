package org.taag.model.DAO;

import org.taag.model.AttributeJsonDeserialize;
import org.taag.model.AttributeMessages;
import org.taag.model.PreDefinedAttributes;

public class AttributeDAO implements PreDefinedAttributes{
	
    AttributeDAOImpl attributeDAOImpl = new AttributeDAOImpl();
    
	public AttributeMessages createAttribute(AttributeJsonDeserialize attriObj) {
		AttributeMessages attributeMessages = attributeDAOImpl.createAttribute(attriObj);
		return attributeMessages;
	}
	
	public AttributeMessages updateAttribute(AttributeJsonDeserialize attriObj) {
		AttributeMessages attributeMessages = attributeDAOImpl.updateAttributes(attriObj);
		return attributeMessages;
	}

	public AttributeMessages getPredefinedAttributes() {
		AttributeMessages attributeMessages = attributeDAOImpl.getPredefinedAttributes();
		return attributeMessages;
	}

	

}
