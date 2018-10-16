package org.taag.controller;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.json.simple.JSONObject;
import org.taag.model.Position;
import org.taag.model.PositionMessages;
import org.taag.model.DAO.PositionDAO;

@Path("/position")
public class PositionService {

	@POST
	@Consumes({ MediaType.APPLICATION_JSON })
	@Produces({ MediaType.APPLICATION_JSON })
	public Response createPosition(Position pos) throws Exception {

		PositionDAO pdao = new PositionDAO();
		PositionMessages positionMessages = pdao.createPosition(pos);
		JSONObject obj = new JSONObject();
		Response response = null;
        if(positionMessages.getMessage() != null) {
		obj.put("message", positionMessages.getMessage());
        }
		if (positionMessages.getPosition() != null) {
			obj.put("position_id", positionMessages.getPosition().getPositionID());
//			if (positionMessages.getPosition().getPersonID() != null) {
//				obj.put("person_id", positionMessages.getPosition().getPersonID());
//			}
		}
		if (positionMessages.getStatus() != null) {
			if (positionMessages.getStatus().equals("200")) {
				response = Response.ok(obj, MediaType.APPLICATION_JSON).build();
			} else if(positionMessages.getStatus().equals("204")){
				response = Response.status(Response.Status.NO_CONTENT).entity(obj).build();
			}
			else {
				response = Response.status(Response.Status.BAD_REQUEST).entity(positionMessages).build();
			}
			}
			return response;


	}

	@GET
	@Produces({ MediaType.APPLICATION_JSON })
	@Path("{id}")
	public Response getPositionForId(@PathParam("id") int positionId) throws Exception {

		PositionDAO pdao = new PositionDAO();
		Response response = null;
		
		Position position = pdao.getPosition(positionId);
		if (position != null) {
			if(position.getStatus().equals("200")) {
			response =  Response.ok(position, MediaType.APPLICATION_JSON).build();
			}
		 else {
			response =  Response.status(Response.Status.NO_CONTENT).build();
		}
		}
		return response;

	}

	@GET
	@Produces({ MediaType.APPLICATION_JSON })
	public Response getAllPositions() {
		PositionDAO pdao = new PositionDAO();
		PositionMessages positionMessages = pdao.getAllPositions();
		if (positionMessages.getPositions() != null) {
			return Response.ok(positionMessages, MediaType.APPLICATION_JSON).build();
		} else {
			return Response.status(Response.Status.NO_CONTENT).build();
		}
	}

	@PUT
	@Produces({ MediaType.APPLICATION_JSON })
	@Path("{id}")
	public Response updatePosition(Position pos, @PathParam("id") int positionId) throws Exception {

		PositionDAO pdao = new PositionDAO();
		PositionMessages positionMessages = pdao.updatePosition(pos, positionId);
		JSONObject obj = new JSONObject();
		Response response = null;
        if(positionMessages.getMessage() != null) {
		obj.put("message", positionMessages.getMessage());
        }
		if (positionMessages.getPosition() != null) {
			obj.put("position_id", positionMessages.getPosition().getPositionID());
//			if (positionMessages.getPosition().getPersonID() != null) {
//				obj.put("person_id", positionMessages.getPosition().getPersonID());
//			}
		}
		if (positionMessages.getStatus() != null) {
			if (positionMessages.getStatus().equals("200")) {
				response = Response.ok(obj, MediaType.APPLICATION_JSON).build();
			} else if(positionMessages.getStatus().equals("204")){
				response = Response.status(Response.Status.NO_CONTENT).entity(obj).build();
			}
			else {
				response = Response.status(Response.Status.BAD_REQUEST).entity(positionMessages).build();
			}
			}
			return response;

	}

	@DELETE
	@Produces({ MediaType.APPLICATION_JSON })
	@Path("{id}")
	public Response deletePosition(@PathParam("id") int positionId) throws Exception {
		PositionDAO pdao = new PositionDAO();
		Response response = null;
		PositionMessages positionMessages = pdao.deletePosition(positionId);
		if (positionMessages.getStatus() != null) {
			if (positionMessages.getStatus().equals("200")) {
				response = Response.ok(positionMessages, MediaType.APPLICATION_JSON).build();
			} else {
				response = Response.status(Response.Status.NO_CONTENT).entity(positionMessages).build();
			}
			}
			return response;

	}

//	public Response jsonDeserializer(PositionMessages positionMessages) {
//		JSONObject obj = new JSONObject();
//		Response response = null;
//
//		if (positionMessages.getPosition() != null) {
//			// obj.put("status", positionMessages.getStatus());
//			obj.put("message", positionMessages.getMessage());
//			if (positionMessages.getPosition().getPositionID() != null) {
//				obj.put("position_id", positionMessages.getPosition().getPositionID());
//			}
//				if (positionMessages.getPosition().getPersonID() != null) {
//					obj.put("person_id", positionMessages.getPosition().getPersonID());
//
//				}
//				if (positionMessages.getPosition().getName() != null) {
//					obj.put("name", positionMessages.getPosition().getName());
//
//				}
//				if (positionMessages.getPosition().getParentPositionID() != null) {
//					obj.put("parent_position_id", positionMessages.getPosition().getParentPositionID());
//
//				}
//
//				if (positionMessages.getStatus() != null) {
//					if (positionMessages.getStatus().equals("200")) {
//						response = Response.ok(obj, MediaType.APPLICATION_JSON).build();
//					}
//				
//
//			
//		} else if (positionMessages.getStatus().equals("204")) {
//
//			response = Response.status(Response.Status.NO_CONTENT).entity(positionMessages).build();
//
//		} else {
//			response = Response.status(Response.Status.BAD_REQUEST).entity(positionMessages).build();
//		}
//			}
//		
//		return response;
//	}

//	private Response jsonDeserializer(Position position) {
//		JSONObject obj = new JSONObject();
//		Response response = null;
//
//		if (position.getMessage() != null) {
//			// obj.put("status", positionMessages.getStatus());
//			obj.put("message", position.getMessage());
//		}
//		if (position.getPositionID() != null) {
//			obj.put("position_id", position.getPositionID());
//		}
//		if (position.getPersonID() != null) {
//			obj.put("person_id", position.getPersonID());
//
//		}
//		if (position.getName() != null) {
//			obj.put("name", position.getName());
//		}
//		if (position.getParentPositionID() != null) {
//			obj.put("parent_position_id", position.getParentPositionID());
//		}
//
//		if (position.getStatus() != null) {
//			if (position.getStatus().equals("200")) {
//				response = Response.ok(obj, MediaType.APPLICATION_JSON).build();
//			}
//			
//		 else {
//			 response =  Response.status(Response.Status.NO_CONTENT).entity(position).build();
//		}
//		}
//		
//		return response;
//	}

}
