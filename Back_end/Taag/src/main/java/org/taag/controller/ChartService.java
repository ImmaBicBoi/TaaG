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
import org.taag.model.Chart;
import org.taag.model.ChartMessages;
import org.taag.model.Person;
import org.taag.model.DAO.ChartDAO;
import org.taag.model.DAO.PersonDAO;

@Path("/chart")
public class ChartService {
	
	@POST
	@Consumes({ MediaType.APPLICATION_JSON })
	@Produces({ MediaType.APPLICATION_JSON })
	public Response saveChart(Chart chart) throws Exception {
		
		ChartMessages chartMessages = new ChartMessages();
		ChartDAO chartDAO = new  ChartDAO();
		chartDAO.saveChart(chart);
		
		JSONObject obj = new JSONObject();
		Response response = null;

		if(chartMessages.getMessage() != null) {
			obj.put("message", chartMessages.getMessage());
		}
		if (chartMessages.getStatus() != null) {
			if (chartMessages.getStatus().equals("200")) {
				response = Response.ok(obj, MediaType.APPLICATION_JSON).build();
			} else if(chartMessages.getStatus().equals("204")){
				response = Response.status(Response.Status.NO_CONTENT).entity(obj).build();
			}
			else {
				response = Response.status(Response.Status.BAD_REQUEST).entity(chartMessages).build();
			}
			}
		
		return response;
		
	}
	
	@GET
	@Produces({ MediaType.APPLICATION_JSON })
	@Path("{id}")
	public Response getChart(@PathParam("id") int chartId) throws Exception {
		ChartDAO cdao = new ChartDAO();
		Response response = null;
		Chart chart = cdao.getChart(chartId);
		if (chart.getStatus() != null) {
			if(chart.getStatus().equals("200")) {
			response =  Response.ok(chart, MediaType.APPLICATION_JSON).build();
			}
		 else {
			response =  Response.status(Response.Status.NO_CONTENT).build();
		}
		}
		return response;
		
	}
	
	@PUT
	@Produces({ MediaType.APPLICATION_JSON })
	@Path("{id}")
	public Response updateChart(Chart chart, @PathParam("id") int chartId) throws Exception {
		return null;
		
	}
	
	@DELETE
	@Produces({ MediaType.APPLICATION_JSON })
	@Path("{id}")
	public Response deleteChart(@PathParam("id") int chartId) throws Exception {
		return null;
		
	}

}
