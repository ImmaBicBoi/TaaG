package org.taag.model.DAO;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.taag.connection.JDBCConnection;
import org.taag.model.Chart;
import org.taag.model.ChartMessages;
import org.taag.model.Charts;
import org.taag.model.Person;
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
		ChartMessages chartMessages = new ChartMessages();
		try {

			Boolean exists = checkChartId(chartId);
			if (exists) {
				PreparedStatement ps = connection.prepareStatement("call DELETE_CHART('" + chartId + "')");

				ps.executeUpdate();
				chartMessages.setMessage("Chart deleted successfully");
				chartMessages.setStatus(statusMessages.GetStatus(StatusMessage.status.OK));			
				ps.close();

			} else {
				chartMessages.setMessage("Error Chart with provided id does not exist");
				chartMessages.setStatus(statusMessages.GetStatus(StatusMessage.status.NOCONTENT));
			}

		}

		catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return chartMessages;

		
	}
	private Boolean checkChartId(Integer chartId) {
		Boolean exists = false;
		try {
			if (chartId != 0) {
				PreparedStatement ps = connection
						.prepareStatement("select * from ORG_CHART where CHART_ID=" + "'" + chartId + "'");
				ResultSet rs = ps.executeQuery();
				while (rs.next()) {

					exists = true;

				}
				rs.close();
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return exists;
	}
	
}
