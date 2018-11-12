package org.taag.model.DAO;

import org.taag.model.Chart;
import org.taag.model.ChartMessages;
import org.taag.model.Charts;

public class ChartDAO implements Charts{
	
	ChartDAOImpl daoImpl = new  ChartDAOImpl();
	
	public ChartMessages saveChart(Chart chart) {
		ChartMessages chartMessages = new ChartMessages();
		chartMessages = daoImpl.saveChart(chart);
		return chartMessages;
	}

	public ChartMessages updateChart(Chart chart, int chartId) {
		// TODO Auto-generated method stub
		return null;
	}

	public Chart getChart(int chartId) {
		Chart chart = new Chart();
		chart = daoImpl.getChart(chartId);
		return chart;
	}

	public ChartMessages deleteChart(int chartId) {
		
		ChartMessages chartMessages = daoImpl.deleteChart(chartId);
		return chartMessages;
	}

	
	

}
