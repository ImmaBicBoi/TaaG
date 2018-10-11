package org.taag.model.DAO;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.taag.connection.JDBCConnection;
import org.taag.model.Position;
import org.taag.model.PositionMessages;
import org.taag.model.Positions;

public class PositionDaoImpl implements Positions {

	JDBCConnection jdbcConnection = new JDBCConnection();

	Connection connection = jdbcConnection.getConnnection();

	public PositionMessages createPosition(Position pos) {
		PositionMessages positionMessages = new PositionMessages();
		if (pos.getPersonID() != 0) {
			Boolean exists = checkPersonId(pos.getPersonID());
			if (exists == true) {
				Boolean personAlreadyExits = checkIfAnyPositionHasPerson(pos);
				if (personAlreadyExits) {
					positionMessages.setMessage("Another position already has this person");
				} else {
					createPositionDBConn(pos, positionMessages);
				}
			} else {
				positionMessages.setMessage("Person does not exist");
			}
		} else {
			createPositionDBConn(pos, positionMessages);
		}

		return positionMessages;
	}

	private void createPositionDBConn(Position pos, PositionMessages positionMessages) {
		PreparedStatement ps = null;
		try {
			ps = connection.prepareStatement("call CREATE_POSITION (?,?,?)");
			ps.setString(1, pos.getName());
			ps.setInt(2, pos.getParentPositionID());
			ps.setInt(3, pos.getPersonID());

			ps.executeUpdate();

//			positionMessages.setStatus("success");
			positionMessages.setMessage("Position created succesfully");
			positionMessages.setPosition(pos);

			pos.setPositionID(getPositionId(pos.getName()));
		} catch (SQLException e) {
//			positionMessages.setStatus("Failed");
			positionMessages
					.setMessage("Error unable to create position, missing required parameter/position already exists");
			e.printStackTrace();
		}

	}

	public PositionMessages updatePosition(Position pos, int positionId) {
		PositionMessages positionMessages = new PositionMessages();
		Boolean positionExists = checkPositionId(positionId);
		if (positionExists) {
			if (pos.getPersonID() != 0) {
				Boolean exists = checkPersonId(pos.getPersonID());
				if (exists == true) {
					Boolean personAlreadyExits = checkIfAnyPositionHasPerson(pos);
					if (personAlreadyExits) {
						positionMessages.setMessage("Another position already has this person");
					} else {

						updatePositionDBConn(pos, positionId, positionMessages);
					}
				} else {
					positionMessages.setMessage("Person does not exist");
				}
			} else {
				updatePositionDBConn(pos, positionId, positionMessages);
			}

		} else {
//			positionMessages.setStatus("Failed");
			positionMessages.setMessage("Error position with provided id does not exist");
		}

		return positionMessages;
	}

	private void updatePositionDBConn(Position pos, int positionId, PositionMessages positionMessages) {
		try {
			PreparedStatement ps = connection.prepareStatement("call UPDATE_POSITION( " + "'" + positionId + "','"
					+ pos.getName() + "','" + pos.getParentPositionID() + "','" + pos.getPersonID() + "')");

			ps.executeUpdate();

//			positionMessages.setStatus("success");
			positionMessages.setMessage("Position updated successfully");

			pos.setPositionID(getPositionId(pos.getName()));
			positionMessages.setPosition(pos);
		} catch (SQLException e) {
//			positionMessages.setStatus("Failed");
			positionMessages
					.setMessage("Error unable to update position, missing required parameter/some other issues");
			e.printStackTrace();
		}

	}

	public Position getPosition(int positionId) {
		Position position = new Position();
		Boolean exists = checkPositionId(positionId);
		try {
			PreparedStatement ps = connection.prepareStatement("call RETRIEVE_POSITION('" + positionId + "')");
			ResultSet rs = ps.executeQuery();
			if (exists) {
				while (rs.next()) {

					position.setName(rs.getString("POSITION_NAME"));
					position.setPersonID(rs.getInt("PERSON_ID"));
					position.setParentPositionID(rs.getInt("PARENT_POS_ID"));
					position.setPositionID(rs.getInt("POSITION_ID"));
//					position.setStatus("Success");
					position.setMessage("Position retrieved successfully");

				}
			} else {
//				position.setStatus("Failed");
				position.setMessage("Error position with provided id does not exist");
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

//				positionMessages.setStatus("success");
				positionMessages.setMessage("Position deleted successfully");

			} else {
//				positionMessages.setStatus("Failed");
				positionMessages.setMessage("Error position with provided id does not exist");
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

		try {
			PreparedStatement ps = connection.prepareStatement("call RETRIEVE_ALL_POSITIONS");
			ResultSet rs = ps.executeQuery();
			while (rs.next()) {
				Position position = new Position();
				position.setName(rs.getString("POSITION_NAME"));
				position.setPersonID(rs.getInt("PERSON_ID"));
				position.setParentPositionID(rs.getInt("PARENT_POS_ID"));
				position.setPositionID(rs.getInt("POSITION_ID"));
//				positionMessages.setStatus("success");
				positionMessages.setMessage("Position retrieved successfully");
				positions.add(position);
				positionMessages.setPositions(positions);

			}

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

	private Boolean checkIfAnyPositionHasPerson(Position pos) {
		Boolean exists = false;
		try {
			if (pos.getPersonID() != 0) {
				PreparedStatement ps = connection.prepareStatement("select POSITION_ID from POSITION where PERSON_ID="
						+ "'" + pos.getPersonID() + "' and POSITION_NAME = " + "'" + pos.getName() + "'");

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

	public int getPositionId(String positionName) {
		int positionID = 0;
		try {

			PreparedStatement ps = connection.prepareStatement(
					"select POSITION_ID from POSITION where POSITION_NAME = " + "'" + positionName + "'");
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
