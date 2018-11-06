package org.taag.model.DAO;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;

import org.taag.connection.JDBCConnection;
import org.taag.model.Chart;
import org.taag.model.ChartMessages;
import org.taag.model.Charts;
import org.taag.model.StatusMessage;

public class ChartDAOImpl implements Charts{
	
	JDBCConnection jdbcConnection = new JDBCConnection();
	Connection connection = jdbcConnection.getConnnection();
	StatusMessage statusMessages = new StatusMessage();
	
	
	public ChartMessages saveChart(Chart chart) {
		ChartMessages chartMessages = new ChartMessages();
		try {
		CallableStatement cs = connection.prepareCall("call CREATE_CHART(?,?)");
		cs.setString(1, chart.getName());
		cs.setString(2, chart.getData());
		cs.executeUpdate();
		
		chartMessages.setMessage("chart saved successfully");
		chartMessages.setStatus(statusMessages.GetStatus(StatusMessage.status.OK));
		}catch (Exception e) {
			e.printStackTrace();
			chartMessages.setStatus(statusMessages.GetStatus(StatusMessage.status.ERROR));
			chartMessages.setMessage("Error: unable to save graph, missing required parameter");
		}
		return chartMessages;
	}

	public ChartMessages updateChart(Chart chart, int chartId) {
		// TODO Auto-generated method stub
		return null;
	}

	public Chart getChart(int chartId) {
		Chart chart = new Chart();
		try {
			CallableStatement cs = connection.prepareCall("call RETRIEVE_CHART(?)");
			cs.setInt(1, chartId);
			ResultSet rs = cs.executeQuery();
			
			while(rs.next()) {
				chart.setChart_id(rs.getInt("CHART_ID"));
				chart.setName(rs.getString("CHART_NAME"));
				chart.setData(rs.getString("CHART_DATA"));
				chart.setMessage("Chart retrieved successfully");
				chart.setStatus(statusMessages.GetStatus(StatusMessage.status.OK));
			}
			
			
			}catch (Exception e) {
				e.printStackTrace();
			}
			return chart;
	}

	public ChartMessages deleteChart(int chartId) {
		// TODO Auto-generated method stub
		return null;
	}

	
}
