package org.taag.model.DAO;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.taag.connection.JDBCConnection;
import org.taag.model.Attributes;
import org.taag.model.Position;
import org.taag.model.PositionMessages;
import org.taag.model.Positions;
import org.taag.model.StatusMessage;

public class PositionDaoImpl implements Positions {

	JDBCConnection jdbcConnection = new JDBCConnection();

	Connection connection = jdbcConnection.getConnnection();
	StatusMessage statusMessages = new StatusMessage();

	public PositionMessages createPosition(Position pos) {
		PositionMessages positionMessages = new PositionMessages();
		if (pos.getPersonID() != 0) {
			Boolean exists = checkPersonId(pos.getPersonID());
			if (exists == true) {
//				Boolean personAlreadyExits = checkIfAnyPositionHasPerson(pos);
//				if (personAlreadyExits == true) {
//					positionMessages.setMessage("Another position already has this person");
//					positionMessages.setStatus(statusMessages.GetStatus(StatusMessage.status.NOCONTENT));
//				} else {
					createPositionDBConn(pos, positionMessages);
//				}
			} else {
				positionMessages.setMessage("Person does not exist");
				positionMessages.setStatus(statusMessages.GetStatus(StatusMessage.status.NOCONTENT));
			}
		} else {
			createPositionDBConn(pos, positionMessages);
		}

		return positionMessages;
	}

	private void createPositionDBConn(Position pos, PositionMessages positionMessages) {
		PreparedStatement ps = null;
		try {
			ps = connection.prepareStatement("call CREATE_POSITION (?,?,?,?)");
			ps.setString(1, pos.getName());
			ps.setInt(2, pos.getParentPositionID());
			ps.setInt(3, pos.getPersonID());
			ps.setString(4, pos.getEmployee_id());

			ps.executeUpdate();
			
			pos.setPositionID(getPositionId(pos.getEmployee_id()));
			
			List<Attributes> attributes = pos.getAttribute();
			
			for(Attributes attri : attributes) {
				ps = connection.prepareStatement("call CREATE_ATTRIBUTE (?,?,?)");
				ps.setString(1, attri.getKey());
				ps.setString(2, attri.getValue());
				ps.setInt(3, pos.getPositionID());
				ps.executeUpdate();
			}
			

			positionMessages.setMessage("Position created succesfully");
			positionMessages.setPosition(pos);
			positionMessages.setStatus(statusMessages.GetStatus(StatusMessage.status.OK));

//			pos.setPositionID(getPositionId(pos.getName()));
		} catch (SQLException e) {
			positionMessages
					.setMessage("Error unable to create position, missing required parameter/position already exists");
			e.printStackTrace();
			positionMessages.setStatus(statusMessages.GetStatus(StatusMessage.status.ERROR));
		}

	}

	public PositionMessages updatePosition(Position pos, int positionId) {
		PositionMessages positionMessages = new PositionMessages();
		Boolean positionExists = checkPositionId(positionId);
		if (positionExists) {
			if (pos.getPersonID() != 0) {
				Boolean exists = checkPersonId(pos.getPersonID());
				if (exists == true) {
//					Boolean personAlreadyExits = checkIfAnyPositionHasPerson(pos);
//					if (personAlreadyExits == true) {
//						positionMessages.setMessage("Another position already has this person");
//						positionMessages.setStatus(statusMessages.GetStatus(StatusMessage.status.NOCONTENT));
//					} else {

						updatePositionDBConn(pos, positionId, positionMessages);
//					}
				} else {
					positionMessages.setMessage("Person does not exist");
					positionMessages.setStatus(statusMessages.GetStatus(StatusMessage.status.NOCONTENT));
				}
			} else {
				updatePositionDBConn(pos, positionId, positionMessages);
			}

		} else {
			positionMessages.setMessage("Error position with provided id does not exist");
			positionMessages.setStatus(statusMessages.GetStatus(StatusMessage.status.NOCONTENT));
		}

		return positionMessages;
	}

	private void updatePositionDBConn(Position pos, int positionId, PositionMessages positionMessages) {
		try {
			PreparedStatement ps = connection.prepareStatement("call UPDATE_POSITION( " + "'" + positionId + "','"
					+ pos.getName() + "','" + pos.getParentPositionID() + "','" + pos.getPersonID() + "')");

			ps.executeUpdate();

			positionMessages.setMessage("Position updated successfully");
			positionMessages.setStatus(statusMessages.GetStatus(StatusMessage.status.OK));

			pos.setPositionID(getPositionId(pos.getName()));
			positionMessages.setPosition(pos);
		} catch (SQLException e) {
			positionMessages.setStatus(statusMessages.GetStatus(StatusMessage.status.ERROR));
			positionMessages
					.setMessage("Error unable to update position, missing required parameter/position already exists");
			e.printStackTrace();
		}

	}

	public Position getPosition(int positionId) {
		Position position = new Position();
		Attributes attribute = new Attributes();
		List<Attributes> attributes = new ArrayList<Attributes>();
		PreparedStatement ps;
		ResultSet rs;
		Boolean exists = checkPositionId(positionId);
		try {
			 ps = connection.prepareStatement("call RETRIEVE_POSITION('" + positionId + "')");
			 rs = ps.executeQuery();
			if (exists) {
				while (rs.next()) {

					position.setName(rs.getString("POSITION_NAME"));
					position.setPersonID(rs.getInt("PERSON_ID"));
					position.setParentPositionID(rs.getInt("PARENT_POS_ID"));
					position.setPositionID(rs.getInt("POSITION_ID"));
					position.setEmployee_id(rs.getString("EMPLOYEE_ID"));
					position.setMessage("Position retrieved successfully");
					position.setStatus(statusMessages.GetStatus(StatusMessage.status.OK));

				}
				
				ps = connection.prepareStatement("select * from POSATTRIBUTE where POSITION_ID ="+positionId);
				rs = ps.executeQuery();
				while (rs.next()) {

					attribute.setKey(rs.getString("ATTRIBUTE_KEY"));
					attribute.setValue(rs.getString("ATTRIBUTE_VALUE"));
					attributes.add(attribute);
				}
				position.setAttribute(attributes);
				
			} else {
				position.setMessage("Error position with provided id does not exist");
				position.setStatus(statusMessages.GetStatus(StatusMessage.status.NOCONTENT));
			}
			rs.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return position;
	}

	public PositionMessages deletePosition(int positionId) {
		PositionMessages positionMessages = new PositionMessages();
		try {

			Boolean exists = checkPositionId(positionId);
			if (exists) {
				PreparedStatement ps = connection.prepareStatement("call DELETE_POSITION('" + positionId + "')");

				ps.executeUpdate();

				positionMessages.setMessage("Position deleted successfully");
				positionMessages.setStatus(statusMessages.GetStatus(StatusMessage.status.OK));

			} else {
				positionMessages.setMessage("Error position with provided id does not exist");
				positionMessages.setStatus(statusMessages.GetStatus(StatusMessage.status.NOCONTENT));
			}

		}

		catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return positionMessages;

	}

	public PositionMessages getAllPositions() {
		List<Position> positions = new ArrayList<Position>();
		PositionMessages positionMessages = new PositionMessages();
		Attributes attribute = new Attributes();
		List<Attributes> attributes = new ArrayList<Attributes>();
		ResultSet rs;
		try {
			PreparedStatement ps = connection.prepareStatement("select P.POSITION_ID,P.POSITION_NAME,P.PARENT_POS_ID,P.PERSON_ID,P.EMPLOYEE_ID,A.ATTRIBUTE_KEY,A.ATTRIBUTE_VALUE from  POSITION P,POSATTRIBUTE A\r\n" + 
					"		where P.POSITION_ID = A.POSITION_ID;");
			 rs = ps.executeQuery();
			while (rs.next()) {
//				Integer currentPosition = 0;
//				Integer posId = currentPosition - 1;
				Position position = new Position();
				position.setName(rs.getString("POSITION_NAME"));
				position.setPersonID(rs.getInt("PERSON_ID"));
				position.setParentPositionID(rs.getInt("PARENT_POS_ID"));
				position.setPositionID(rs.getInt("POSITION_ID"));
//				currentPosition = rs.getInt("POSITION_ID");
				position.setEmployee_id(rs.getString("EMPLOYEE_ID"));
				attribute.setKey(rs.getString("ATTRIBUTE_KEY"));
				attribute.setValue(rs.getString("ATTRIBUTE_VALUE"));
				attributes.add(attribute);
				positionMessages.setMessage("Position retrieved successfully");
				positionMessages.setStatus(statusMessages.GetStatus(StatusMessage.status.OK));
				position.setAttribute(attributes);
				positions.add(position);
				positionMessages.setPositions(positions);

			}
//			for(Position pos : positions) {
//			ps = connection.prepareStatement("select * from POSATTRIBUTE where POSITION_ID ="+pos.getPositionID());
//			rs = ps.executeQuery();
//			while (rs.next()) {
//
//				attribute.setKey(rs.getString("ATTRIBUTE_KEY"));
//				attribute.setValue(rs.getString("ATTRIBUTE_VALUE"));
//				attributes.add(attribute);
//			}
//			
//			pos.setAttribute(attributes);
//			//positions.add(pos);
//			//position.setAttribute(attributes);
//			positionMessages.setPositions(positions);
		//}
		
			

			rs.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return positionMessages;
	}

	private Boolean checkPersonId(Integer positionID) {
		Boolean exists = false;
		try {
			if (positionID != 0) {
				PreparedStatement ps = connection
						.prepareStatement("select * from PERSON where PERSON_ID=" + "'" + positionID + "'");
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

//	private Boolean checkIfAnyPositionHasPerson(Position pos) {
//		Boolean exists = false;
//		try {
//			if (pos.getPersonID() != 0) {
//				PreparedStatement ps = connection.prepareStatement("select POSITION_ID from POSITION where PERSON_ID="
//						+ "'" + pos.getPersonID() + "' and POSITION_NAME = " + "'" + pos.getName() + "'");
//
//				ResultSet rs = ps.executeQuery();
//				while (rs.next()) {
//					exists = true;
//				}
//				rs.close();
//			}
//		} catch (SQLException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
//
//		return exists;
//	}

	private Boolean checkPositionId(int positionId) {
		Boolean exists = false;
		try {
			PreparedStatement ps = connection.prepareStatement(
					"select POSITION_NAME,PARENT_POS_ID from POSITION where POSITION_ID = " + "'" + positionId + "'");
			ResultSet rs = ps.executeQuery();
			while (rs.next()) {

				exists = true;

			}
			rs.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return exists;
	}

//	public int getPositionId(String positionName) {
//		int positionID = 0;
//		try {
//
//			PreparedStatement ps = connection.prepareStatement(
//					"select POSITION_ID from POSITION where POSITION_NAME = " + "'" + positionName + "'");
//			ResultSet rs = ps.executeQuery();
//
//			while (rs.next()) {
//				positionID = rs.getInt("POSITION_ID");
//
//			}
//			rs.close();
//		} catch (SQLException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
//		return positionID;
//
//	}
	
	public int getPositionId(String employeeId) {
		int positionID = 0;
		try {

			PreparedStatement ps = connection.prepareStatement(
					"select POSITION_ID from POSITION where EMPLOYEE_ID = " + "'" + employeeId + "'");
			ResultSet rs = ps.executeQuery();

			while (rs.next()) {
				positionID = rs.getInt("POSITION_ID");

			}
			rs.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return positionID;

	}

}
