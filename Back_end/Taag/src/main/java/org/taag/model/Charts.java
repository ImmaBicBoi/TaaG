package org.taag.model;

public interface Charts {
	
	public ChartMessages saveChart(Chart chart);

	public ChartMessages updateChart(Chart chart, int chartId);

	public Chart getChart(int chartId);
	
	public Chart getLatestChart();

	public ChartMessages deleteChart(int chartId);


}
