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

		try {
			// Boolean exists = checkPersonId(pos);
			// if (exists == false) {
			PreparedStatement ps = connection.prepareStatement("call CREATE_POSITION (?,?,?)");
			ps.setString(1, pos.getName());
			// ps.setString(3, pos.getPersonID());
			ps.setInt(2, pos.getPositionWeight());
			ps.setInt(3, pos.getParentPositionID());
			ps.executeUpdate();

			positionMessages.setStatus("success");
			positionMessages.setMessage("Position created succesfully");
			positionMessages.setPosition(pos);

			pos.setPositionID(getPositionId(pos.getName()));
			// } else {
			// pos.setStatus("Failed");
			// pos.setMessage("Position already has a person");
			// }

		}

		catch (SQLException e) {
			positionMessages.setStatus("Failed");
			positionMessages
					.setMessage("Error unable to create position, missing required parameter/position already exists");
			e.printStackTrace();
		}

		return positionMessages;
	}

	public PositionMessages updatePosition(Position pos, int positionId) {
		PositionMessages positionMessages = new PositionMessages();
		try {
			Boolean exists = checkPositionId(positionId);
			if (exists) {
				PreparedStatement ps = connection.prepareStatement("call UPDATE_POSITION( " + "'" + positionId + "','"
						+ pos.getName() + "','" + pos.getPositionWeight() + "','" + pos.getPositionWeight() + "')");

				ps.executeUpdate();

				positionMessages.setStatus("success");
				positionMessages.setMessage("Position updated successfully");

				pos.setPositionID(getPositionId(pos.getName()));
				positionMessages.setPosition(pos);
			} else {
				positionMessages.setStatus("Failed");
				positionMessages.setMessage("Error position with provided id does not exist");
			}

		}

		catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return positionMessages;
	}

	public Position getPosition(int positionId) {
		Position position = new Position();
		PositionMessages positionMessages = new PositionMessages();
		Boolean exist = true;
		try {
			PreparedStatement ps = connection.prepareStatement("call RETRIEVE_POSITION('" + positionId + "')");
			ResultSet rs = ps.executeQuery();
			System.out.println("getting values");
			if (exist == true) {
				while (rs.next()) {

					position.setName(rs.getString("POSITION_NAME"));
					position.setPositionWeight(rs.getInt("POSITION_WEIGHT"));
					position.setParentPositionID(rs.getInt("PARENT_POS_ID"));
					position.setPositionID(rs.getInt("POSITION_ID"));
					position.setStatus("Success");
					position.setMessage("Position retrieved successfully");

				}
			} else {
				exist = false;
				position.setStatus("Failed");
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
		Position pos = new Position();
		try {

			Boolean exists = checkPositionId(positionId);
			if (exists) {
				PreparedStatement ps = connection.prepareStatement("call DELETE_POSITION('" + positionId + "')");

				ps.executeUpdate();

				positionMessages.setStatus("success");
				positionMessages.setMessage("Position deleted successfully");

			} else {
				positionMessages.setStatus("Failed");
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
			System.out.println("getting values");
			while (rs.next()) {
				Position position = new Position();
				position.setName(rs.getString("POSITION_NAME"));
				position.setPositionWeight(rs.getInt("POSITION_WEIGHT"));
				position.setParentPositionID(rs.getInt("PARENT_POS_ID"));
				position.setPositionID(rs.getInt("POSITION_ID"));
				positionMessages.setStatus("success");
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

	// private Boolean checkPersonId(Position pos) {
	// Boolean exists = false;
	// try {
	// PreparedStatement ps = connection
	// .prepareStatement("select positionID from positions where personID=" +"'"+
	// pos.getPersonID()+"' and name = "+ "'"+pos.getName()+"'");
	// ResultSet rs = ps.executeQuery();
	// System.out.println("getting values");
	// while (rs.next()) {
	//
	// String positionID = rs.getString("positionID");
	//
	// if (positionID != null) {
	// exists = true;
	// }
	//
	// }
	// rs.close();
	// } catch (SQLException e) {
	// // TODO Auto-generated catch block
	// e.printStackTrace();
	// }
	//
	// return exists;
	//
	// }

	private Boolean checkPositionId(int positionId) {
		Boolean exists = false;
		try {
			PreparedStatement ps = connection.prepareStatement(
					"select POSITION_NAME,POSITION_WEIGHT from POSITION where POSITION_ID = " + "'" + positionId + "'");
			ResultSet rs = ps.executeQuery();
			while (rs.next()) {
				String name = rs.getString("POSITION_NAME");
				String positionWeight = rs.getString("POSITION_WEIGHT");

				if (name != null && positionWeight != null) {
					exists = true;
				}

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
