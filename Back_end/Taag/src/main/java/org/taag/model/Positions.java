package org.taag.model;

public interface Positions {

	public PositionMessages createPosition(Position pos);

	public PositionMessages updatePosition(Position pos, int positionId);

	public Position getPosition(int positionId);

	public PositionMessages deletePosition(int positionId);

	public PositionMessages getAllPositions();

}
