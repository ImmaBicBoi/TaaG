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

import org.json.simple.JSONObject;
import org.taag.model.Position;
import org.taag.model.PositionMessages;
import org.taag.model.DAO.PositionDAO;

@Path("/position")
public class PositionService {

	@POST
	@Consumes({ MediaType.APPLICATION_JSON })
	@Produces({ MediaType.APPLICATION_JSON })
	public JSONObject createPosition(Position pos) throws Exception {

		PositionDAO pdao = new PositionDAO();
		PositionMessages positionMessages = pdao.createPosition(pos);

		JSONObject obj = new JSONObject();

//		obj.put("status", positionMessages.getStatus());
		obj.put("message", positionMessages.getMessage());
		if (positionMessages.getPosition() != null) {
			obj.put("position_id", positionMessages.getPosition().getPositionID());
			if (positionMessages.getPosition().getPersonID() != null) {
				obj.put("person_id", positionMessages.getPosition().getPersonID());
			}
		}

		return obj;
	}

	@GET
	@Produces({ MediaType.APPLICATION_JSON })
	@Path("{id}")
	public Position getPositionForId(@PathParam("id") int positionId) throws Exception {

		PositionDAO pdao = new PositionDAO();
		Position position = pdao.getPosition(positionId);

		return position;

	}

	@GET
	@Produces({ MediaType.APPLICATION_JSON })
	public PositionMessages getAllPositions() {
		PositionDAO pdao = new PositionDAO();
		PositionMessages positionMessages = pdao.getAllPositions();
		return positionMessages;
	}

	@PUT
	@Produces({ MediaType.APPLICATION_JSON })
	@Path("{id}")
	public JSONObject updatePosition(Position pos, @PathParam("id") int positionId) throws Exception {

		PositionDAO pdao = new PositionDAO();
		PositionMessages positionMessages = pdao.updatePosition(pos, positionId);
		JSONObject obj = new JSONObject();
//		obj.put("status", positionMessages.getStatus());
		obj.put("message", positionMessages.getMessage());
		if (positionMessages.getPosition() != null) {
			obj.put("position_id", positionMessages.getPosition().getPositionID());
			if (positionMessages.getPosition().getPersonID() != null) {
				obj.put("person_id", positionMessages.getPosition().getPersonID());
			}
		}
		return obj;

	}

	@DELETE
	@Produces({ MediaType.APPLICATION_JSON })
	@Path("{id}")
	public JSONObject deletePosition(@PathParam("id") int positionId) throws Exception {

		PositionDAO pdao = new PositionDAO();
		PositionMessages positionMessages = pdao.deletePosition(positionId);
		JSONObject obj = new JSONObject();
//		obj.put("status", positionMessages.getStatus());
		obj.put("message", positionMessages.getMessage());
		return obj;

	}

}
