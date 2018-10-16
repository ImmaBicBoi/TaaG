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
import org.taag.model.Person;
import org.taag.model.PersonMessages;
import org.taag.model.DAO.PersonDAO;

@Path("/person")
public class PersonService {

	@POST
	@Consumes({ MediaType.APPLICATION_JSON })
	@Produces({ MediaType.APPLICATION_JSON })
	public Response createPerson(Person per) throws Exception {

		PersonDAO pdao = new PersonDAO();
		PersonMessages personMessages = pdao.createPerson(per);
		JSONObject obj = new JSONObject();
		Response response = null;

		if(personMessages.getMessage() != null) {
			obj.put("message", personMessages.getMessage());
		}
		if (personMessages.getPerson() != null) {
			if (personMessages.getPerson().getPersonID() != null) {
				obj.put("person_id", personMessages.getPerson().getPersonID());
			}
		}
		if (personMessages.getStatus() != null) {
			if (personMessages.getStatus().equals("200")) {
				response = Response.ok(obj, MediaType.APPLICATION_JSON).build();
			} else if(personMessages.getStatus().equals("204")){
				response = Response.status(Response.Status.NO_CONTENT).entity(obj).build();
			}
			else {
				response = Response.status(Response.Status.BAD_REQUEST).entity(personMessages).build();
			}
			}
			return response;

	}

	@GET
	@Produces({ MediaType.APPLICATION_JSON })
	@Path("{id}")
	public Response getPersonForId(@PathParam("id") int personId) throws Exception {

		PersonDAO pdao = new PersonDAO();
		Response response = null;
		Person person = pdao.getPerson(personId);
		if (person != null) {
			if(person.getStatus().equals("200")) {
			response =  Response.ok(person, MediaType.APPLICATION_JSON).build();
			}
		 else {
			response =  Response.status(Response.Status.NO_CONTENT).build();
		}
		}
		return response;

	}

	@GET
	@Produces({ MediaType.APPLICATION_JSON })
	public Response getAllPersons() {
		PersonDAO pdao = new PersonDAO();
		PersonMessages personMessages = pdao.getAllPersons();
		if (personMessages.getPersons() != null) {
			return Response.ok(personMessages, MediaType.APPLICATION_JSON).build();
		} else {
			return Response.status(Response.Status.NO_CONTENT).build();
		}
	}

	@PUT
	@Produces({ MediaType.APPLICATION_JSON })
	@Path("{id}")
	public Response updatePerson(Person per, @PathParam("id") int personId) throws Exception {

		PersonDAO pdao = new PersonDAO();
		JSONObject obj = new JSONObject();
		Response response = null;
		
		PersonMessages personMessages = pdao.updatePerson(per, personId);
		if(personMessages.getMessage() != null) {
			obj.put("message", personMessages.getMessage());
		}
		if (personMessages.getPerson() != null) {
			if (personMessages.getPerson().getPersonID() != null) {
				obj.put("person_id", personMessages.getPerson().getPersonID());
			}
		}
		if (personMessages.getStatus() != null) {
			if (personMessages.getStatus().equals("200")) {
				response = Response.ok(obj, MediaType.APPLICATION_JSON).build();
			} else if(personMessages.getStatus().equals("204")){
				response = Response.status(Response.Status.NO_CONTENT).entity(obj).build();
			}
			else {
				response = Response.status(Response.Status.BAD_REQUEST).entity(personMessages).build();
			}
			}
			return response;
	}

	@DELETE
	@Produces({ MediaType.APPLICATION_JSON })
	@Path("{id}")
	public Response deletePerson(@PathParam("id") int personId) throws Exception {
		PersonDAO pdao = new PersonDAO();
		Response response = null;
		PersonMessages personMessages = pdao.deletePerson(personId);
		if (personMessages.getStatus() != null) {
		if (personMessages.getStatus().equals("200")) {
			response = Response.ok(personMessages, MediaType.APPLICATION_JSON).build();
		} else {
			response = Response.status(Response.Status.NO_CONTENT).entity(personMessages).build();
		}
		}
		return response;

	}

//	public Response jsonDeserializer(PersonMessages personMessages) {
//		JSONObject obj = new JSONObject();
//		Response response = null;
//		if (personMessages.getPerson() != null) {
//			obj.put("message", personMessages.getMessage());
//			if (personMessages.getPerson().getPersonID() != null) {
//				obj.put("person_id", personMessages.getPerson().getPersonID());
//			}
//
//				if (personMessages.getPerson().getFirstName() != null) {
//					obj.put("first_name", personMessages.getPerson().getFirstName());
//
//				}
//				if (personMessages.getPerson().getLastName() != null) {
//					obj.put("last_name", personMessages.getPerson().getLastName());
//
//				}
//				if (personMessages.getPerson().getEmail() != null) {
//					obj.put("email", personMessages.getPerson().getEmail());
//
//				}
//
//
//		
//		if (personMessages.getStatus() != null) {
//			if (personMessages.getStatus().equals("200")) {
//				response = Response.ok(obj, MediaType.APPLICATION_JSON).build();
//			}
//		 else if (personMessages.getStatus().equals("204")) {
//
//			 response =  Response.status(Response.Status.NO_CONTENT).entity(personMessages).build();
//
//		} else {
//			response =  Response.status(Response.Status.BAD_REQUEST).entity(personMessages).build();
//		}
//		}
//		}
//		return response;
//	}

//	private Response jsonDeserializer(Person person) {
//		JSONObject obj = new JSONObject();
//		Response response = null;
//		if (person.getMessage() != null) {
//			obj.put("message", person.getMessage());
//		}
//		if (person.getPersonID() != null) {
//			obj.put("person_id", person.getPersonID());
//		}
//		if (person.getFirstName() != null) {
//			obj.put("first_name", person.getFirstName());
//
//		}
//		if (person.getLastName() != null) {
//			obj.put("last_name", person.getLastName());
//		}
//		if (person.getEmail() != null) {
//			obj.put("email", person.getEmail());
//		}
//		if (person.getStatus() != null) {
//			if (person.getStatus().equals("200")) {
//				response = Response.ok(obj, MediaType.APPLICATION_JSON).build();
//			}else {
//				response = Response.status(Response.Status.NO_CONTENT).entity(person).build();
//			}
//
//			
//		} 
//		return response;
//	}

}
