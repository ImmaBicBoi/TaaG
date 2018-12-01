package org.taag.model;

import java.util.List;

public interface PreDefinedAttributes {

	public AttributeMessages createOrUpdateAttribute(AttributeJsonDeserialize attriObj);
	public AttributeMessages getPredefinedAttributes();
}
