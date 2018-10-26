package org.taag.model.DAO;

import org.taag.model.Position;
import org.taag.model.PositionMessages;
import org.taag.model.Positions;

public class PositionDAO implements Positions {

	PositionDaoImpl daoImpl = new PositionDaoImpl();

	public PositionMessages createPosition(Position pos) {
		PositionMessages positionMessages;
		 positionMessages = daoImpl.createPosition(pos);
		return positionMessages;
	}

	public PositionMessages updatePosition(Position pos, int positionId) {
		PositionMessages positionMessages = daoImpl.updatePosition(pos, positionId);
		return positionMessages;
	}

	public Position getPosition(int positionId) {
		Position pos = daoImpl.getPosition(positionId);
		return pos;
	}

	public PositionMessages deletePosition(int positionId) {
		PositionMessages positionMessages = daoImpl.deletePosition(positionId);
		return positionMessages;

	}

	public PositionMessages getAllPositions() {
		PositionMessages positionMessages = daoImpl.getAllPositions();
		return positionMessages;
	}


}
