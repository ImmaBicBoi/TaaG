package org.taag.controller;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.taag.model.Person;
import org.taag.model.DAO.PersonDAO;

@Path("/person")
public class PersonService {
	
	
	 @POST
	 @Consumes({MediaType.APPLICATION_JSON})
	 @Path("/")
	 public String addPerson(Person pers) throws Exception{
		 
	        PersonDAO pdao = new PersonDAO();
	        pdao.addPerson(pers);
	        System.out.println("Name = "+pers.getName());
	        System.out.println("Role  = "+pers.getRole());
	        
	        return "ok";
	    }
	 
	 @GET
	 @Produces({MediaType.APPLICATION_JSON})
	 @Path("/")
	 public Person getPerson() throws Exception{
		 
	        PersonDAO pdao = new PersonDAO();
	        Person p = pdao.getPerson();
	        return p;
	        
	    }

}
