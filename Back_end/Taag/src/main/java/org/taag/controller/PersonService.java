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
import org.taag.model.Person;
import org.taag.model.PersonMessages;
import org.taag.model.Person;
import org.taag.model.PersonMessages;
import org.taag.model.DAO.PositionDAO;
import org.taag.model.DAO.PersonDAO;

@Path("/person")
public class PersonService {

	@POST
	@Consumes({ MediaType.APPLICATION_JSON })
	@Produces({ MediaType.APPLICATION_JSON })
	public JSONObject createPerson(Person pos) throws Exception {

		PersonDAO pdao = new PersonDAO();
		PersonMessages PersonMessages = pdao.createPerson(pos);

		JSONObject obj = new JSONObject();

//		obj.put("status", PersonMessages.getStatus());
		obj.put("message", PersonMessages.getMessage());
		if (PersonMessages.getPerson() != null) {
			obj.put("person_id", PersonMessages.getPerson().getPersonID());
			if (PersonMessages.getPerson().getPersonID() != null) {
				obj.put("person_id", PersonMessages.getPerson().getPersonID());
			}
		}

		return obj;
	}

	@GET
	@Produces({ MediaType.APPLICATION_JSON })
	@Path("{id}")
	public Person getPersonForId(@PathParam("id") int PersonId) throws Exception {

		PersonDAO pdao = new PersonDAO();
		Person Person = pdao.getPerson(PersonId);

		return Person;

	}

	@GET
	@Produces({ MediaType.APPLICATION_JSON })
	public PersonMessages getAllPersons() {
		PersonDAO pdao = new PersonDAO();
		PersonMessages PersonMessages = pdao.getAllPersons();
		return PersonMessages;
	}

	@PUT
	@Produces({ MediaType.APPLICATION_JSON })
	@Path("{id}")
	public JSONObject updatePerson(Person pos, @PathParam("id") int PersonId) throws Exception {

		PersonDAO pdao = new PersonDAO();
		PersonMessages PersonMessages = pdao.updatePerson(pos, PersonId);
		JSONObject obj = new JSONObject();
//		obj.put("status", PersonMessages.getStatus());
		obj.put("message", PersonMessages.getMessage());
		if (PersonMessages.getPerson() != null) {
			obj.put("person_id", PersonMessages.getPerson().getPersonID());
			if (PersonMessages.getPerson().getPersonID() != null) {
				obj.put("person_id", PersonMessages.getPerson().getPersonID());
			}
		}
		return obj;

	}

	@DELETE
	@Produces({ MediaType.APPLICATION_JSON })
	@Path("{id}")
	public JSONObject deletePerson(@PathParam("id") int PersonId) throws Exception {

		PersonDAO pdao = new PersonDAO();
		PersonMessages PersonMessages = pdao.deletePerson(PersonId);
		JSONObject obj = new JSONObject();
//		obj.put("status", PersonMessages.getStatus());
		obj.put("message", PersonMessages.getMessage());
		return obj;

	}

}