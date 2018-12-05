package org.taag.controller;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.json.simple.JSONObject;
import org.taag.model.AttributeJsonDeserialize;
import org.taag.model.AttributeMessages;
import org.taag.model.DAO.AttributeDAO;

@Path("/attribute")
public class AttributeService {
	
	
	@POST
	@Consumes({ MediaType.APPLICATION_JSON })
	@Produces({ MediaType.APPLICATION_JSON })
	public Response createAttribute(AttributeJsonDeserialize attriObj) throws Exception {
		AttributeDAO adao = new AttributeDAO();
		AttributeMessages attributeMessages = adao.createAttribute(attriObj);
		JSONObject obj = new JSONObject();
		Response response = null;
        if(attributeMessages.getMessage() != null) {
		obj.put("message", attributeMessages.getMessage());
        }
		
		if (attributeMessages.getStatus() != null) {
			if (attributeMessages.getStatus().equals("200")) {
				response = Response.ok(obj, MediaType.APPLICATION_JSON).build();
			} else if(attributeMessages.getStatus().equals("204")){
				response = Response.status(Response.Status.NO_CONTENT).entity(obj).build();
			}
			else {
				response = Response.status(Response.Status.BAD_REQUEST).entity(attributeMessages).build();
			}
			}
			return response;

		
	}
	
	
	@GET
	@Produces({ MediaType.APPLICATION_JSON })
	public Response getAttribute() throws Exception {
		AttributeDAO adao = new AttributeDAO();
		AttributeMessages attributeMessages = adao.getPredefinedAttributes();
		if (attributeMessages!= null) {
			return Response.ok(attributeMessages, MediaType.APPLICATION_JSON).build();
		} else {
			return Response.status(Response.Status.NO_CONTENT).build();
		}
		
	}
	
	@PUT
	@Produces({ MediaType.APPLICATION_JSON })
	public Response updateAttribute(AttributeJsonDeserialize attriObj) throws Exception{
		AttributeDAO adao = new AttributeDAO();
		AttributeMessages attributeMessages = adao.updateAttribute(attriObj);
		JSONObject obj = new JSONObject();
		Response response = null;
        if(attributeMessages.getMessage() != null) {
		obj.put("message", attributeMessages.getMessage());
        }
		
		if (attributeMessages.getStatus() != null) {
			if (attributeMessages.getStatus().equals("200")) {
				response = Response.ok(obj, MediaType.APPLICATION_JSON).build();
			} else if(attributeMessages.getStatus().equals("204")){
				response = Response.status(Response.Status.NO_CONTENT).entity(obj).build();
			}
			else {
				response = Response.status(Response.Status.BAD_REQUEST).entity(attributeMessages).build();
			}
			}
			return response;
	}

}
