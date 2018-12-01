package org.taag.model.DAO;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
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
		if (pos.getPersonID() != null) {
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
		CallableStatement cs = null;
		try {
			cs = connection.prepareCall("call CREATE_POSITION (?,?,?,?,?)");
			cs.setString(1, pos.getName());
			if(pos.getParentPositionID() != null) {
				cs.setInt(2, pos.getParentPositionID());
				}else {
					cs.setNull(2, Types.INTEGER);
				}
			if(pos.getPersonID() != null) {
			cs.setInt(3, pos.getPersonID());
			}else {
				cs.setNull(3, Types.INTEGER);
			}
			cs.setString(4, pos.getJobId());
			cs.registerOutParameter(5, java.sql.Types.INTEGER);

			cs.executeUpdate();
			int positionId = cs.getInt(5);
			pos.setPositionID(positionId);
			//pos.setPositionID(getPositionId(pos.getJobId()));
			if(pos.getAttribute() != null) {
			List<Attributes> attributes = pos.getAttribute();
			
			for(Attributes attri : attributes) {
				cs = connection.prepareCall("call CREATE_POSITION_ATTR (?,?,?)");
				cs.setString(1, attri.getKey());
				cs.setString(2, attri.getValue());
				cs.setInt(3, positionId);
				cs.executeUpdate();
			}
			
			}
			

			positionMessages.setMessage("Position created succesfully");
			positionMessages.setPosition(pos);
			positionMessages.setStatus(statusMessages.GetStatus(StatusMessage.status.OK));

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
			if (pos.getPersonID() != null) {
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
			
			String jobId = null;
			  
			if (pos.getJobId() == null) {
					 jobId = getJobId(positionId);
				 }
			   else {
				    jobId = pos.getJobId();
			   }
			PreparedStatement ps = connection.prepareStatement("call UPDATE_POSITION(?,?,?,?,?)");
			
			ps.setInt(1, positionId);
			ps.setString(2, pos.getName());
			if(pos.getParentPositionID() != null) {
			ps.setInt(3, pos.getParentPositionID());
			}else {
				ps.setNull(3, Types.INTEGER);
			}
			if(pos.getPersonID() != null) {
			ps.setInt(4, pos.getPersonID());
			}else {
				ps.setNull(4, Types.INTEGER);
			}
			ps.setString(5, jobId);

			ps.executeUpdate();
			
			ps = connection.prepareStatement("call DELETE_POSITION_ATTR(?)");
			ps.setInt(1, positionId);
			ps.executeUpdate();
			
			if(pos.getAttribute() != null) {
				List<Attributes> attributes = pos.getAttribute();
				
				for(Attributes attri : attributes) {
					ps = connection.prepareCall("call CREATE_POSITION_ATTR (?,?,?)");
					ps.setString(1, attri.getKey());
					ps.setString(2, attri.getValue());
					ps.setInt(3, positionId);
					ps.executeUpdate();
				}	
			}
			ps.close();

			positionMessages.setMessage("Position updated successfully");
			positionMessages.setStatus(statusMessages.GetStatus(StatusMessage.status.OK));

			pos.setPositionID(positionId);
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
					position.setJobId(rs.getString("JOB_ID"));
					position.setMessage("Position retrieved successfully");
					position.setStatus(statusMessages.GetStatus(StatusMessage.status.OK));

				}
				
				ps = connection.prepareStatement("call RETRIEVE_POSITION_ATTR('" + positionId + "')");
				rs = ps.executeQuery();
				while (rs.next()) {
					Attributes attribute = new Attributes();
					attribute.setKey(rs.getString("ATTR_KEY"));
					attribute.setValue(rs.getString("POS_ATTR_VALUE"));
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
				ps = connection.prepareStatement("call DELETE_POSITION_ATTR(?)");
				ps.setInt(1, positionId);
				ps.executeUpdate();
				ps.close();

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

		try {
			PreparedStatement ps = connection.prepareStatement("call RETRIEVE_ALL_POSITIONS");
			ResultSet rs = ps.executeQuery();
			while (rs.next()) {
				Position position = new Position();
				position.setName(rs.getString("POSITION_NAME"));
				position.setPersonID(rs.getInt("PERSON_ID"));
				position.setParentPositionID(rs.getInt("PARENT_POS_ID"));
				position.setPositionID(rs.getInt("POSITION_ID"));
				position.setJobId(rs.getString("JOB_ID"));
				positionMessages.setMessage("Position retrieved successfully");
				positionMessages.setStatus(statusMessages.GetStatus(StatusMessage.status.OK));
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

	private Boolean checkPersonId(Integer personID) {
		Boolean exists = false;
		try {
//			if (personID != null) {
				PreparedStatement ps = connection
						.prepareStatement("select * from PERSON where PERSON_ID=" + "'" + personID + "'");
				ResultSet rs = ps.executeQuery();
				while (rs.next()) {

					exists = true;

				}
				rs.close();
//			}
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
	
	
	private String getJobId(int positionId) {
		
		
		String jobId = null ;
		try {

			PreparedStatement ps = connection.prepareStatement(
					"select JOB_ID from POSITION where POSITION_ID = " + "'" + positionId + "'");
			ResultSet rs = ps.executeQuery();

			while (rs.next()) {
				jobId = rs.getString("JOB_ID");

			}
			rs.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return jobId;
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
	
//	public int getPositionId(String employeeId) {
//		int positionID = 0;
//		try {
//
//			PreparedStatement ps = connection.prepareStatement(
//					"select POSITION_ID from POSITION where JOB_ID = " + "'" + employeeId + "'");
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

}
