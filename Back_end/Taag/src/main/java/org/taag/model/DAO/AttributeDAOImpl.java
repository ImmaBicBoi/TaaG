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
import org.taag.model.AttributeJsonDeserialize;
import org.taag.model.AttributeMessages;
import org.taag.model.Person;
import org.taag.model.Position;
import org.taag.model.PreDefinedAttributes;
import org.taag.model.StatusMessage;

public class AttributeDAOImpl implements PreDefinedAttributes {

	AttributeMessages attributeMessages = new AttributeMessages();
	JDBCConnection jdbcConnection = new JDBCConnection();
	Connection connection = jdbcConnection.getConnnection();
	StatusMessage statusMessages = new StatusMessage();

	public AttributeMessages createAttribute(AttributeJsonDeserialize attriObj) {
		CallableStatement cs;

		try {
			cs = connection.prepareCall("call INSERT_ATTRIBUTE(?,?,?,?)");

			if (attriObj.getPositions() != null) {
				if (!attriObj.getPositions().isEmpty()) {
					for (Position pos : attriObj.getPositions()) {
						// cs.setInt(1,pos.getAttribute_id());
						cs.setString(1, pos.key);
						cs.setInt(2, pos.order);
						cs.setBoolean(3, pos.getIs_visible());
						cs.setString(4, "Position");
						cs.executeUpdate();

					}
				}
			}

			if (attriObj.getPersons() != null) {
				if (!attriObj.getPersons().isEmpty()) {
					for (Person per : attriObj.getPersons()) {
						// cs.setInt(1,per.getAttribute_id());
						cs.setString(1, per.key);
						cs.setInt(2, per.order);
						cs.setBoolean(3, per.getIs_visible());
						cs.setString(4, "Person");
						cs.executeUpdate();

					}

					if (attriObj.getPositions() != null) {
						if (!attriObj.getPositions().isEmpty()) {
							for (Position pos : attriObj.getPositions()) {

								for (Integer posId : getPositionId()) {
									cs = connection.prepareCall("call CREATE_POSITION_ATTR(?,?,?)");
									cs.setString(1, pos.getKey());
									cs.setNull(2, Types.INTEGER);
									cs.setInt(3, posId);
									cs.executeUpdate();
								}
							}
						}
					}

					if (attriObj.getPersons() != null) {
						if (!attriObj.getPersons().isEmpty()) {
							for (Person per : attriObj.getPersons()) {
								for (Integer perId : getPersonId()) {
									cs = connection.prepareCall("call CREATE_PERSON_ATTR(?,?,?)");
									cs.setString(1, per.getKey());
									cs.setNull(2, Types.INTEGER);
									cs.setInt(3, perId);
									cs.executeUpdate();
								}
							}
						}
					}

				}
			}

			attributeMessages.setMessage("attributes saved successfully");
			attributeMessages.setStatus(statusMessages.GetStatus(StatusMessage.status.OK));
		} catch (Exception e) {
			e.printStackTrace();
			attributeMessages.setStatus(statusMessages.GetStatus(StatusMessage.status.ERROR));
			attributeMessages.setMessage("Error: unable to save attributes, missing required parameter");
		}
		return attributeMessages;
	}

	public AttributeMessages updateAttributes(AttributeJsonDeserialize attriObj) {
		try {
			CallableStatement cs = connection.prepareCall("call UPDATE_ATTRIBUTE(?,?,?,?)");
			if (attriObj.getPositions() != null) {
				if (!attriObj.getPositions().isEmpty()) {
					for (Position pos : attriObj.getPositions()) {
						cs.setInt(1, pos.getAttribute_id());
						cs.setString(2, pos.key);
						cs.setInt(3, pos.order);
						cs.setBoolean(4, pos.getIs_visible());
						cs.executeUpdate();
					}
				}
			}

			if (attriObj.getPersons() != null) {
				if (!attriObj.getPersons().isEmpty()) {
					for (Person per : attriObj.getPersons()) {
						cs.setInt(1, per.getAttribute_id());
						cs.setString(2, per.key);
						cs.setInt(3, per.order);
						cs.setBoolean(4, per.getIs_visible());
						cs.executeUpdate();
					}
				}
			}

			attributeMessages.setMessage("attributes updated successfully");
			attributeMessages.setStatus(statusMessages.GetStatus(StatusMessage.status.OK));
		} catch (Exception e) {
			e.printStackTrace();
			attributeMessages.setStatus(statusMessages.GetStatus(StatusMessage.status.ERROR));
			attributeMessages.setMessage("Error: unable to update attributes, missing required parameter");
		}

		return attributeMessages;
	}

	public AttributeMessages getPredefinedAttributes() {
		PreparedStatement ps;
		ResultSet rs;
		List<Person> persons = new ArrayList<Person>();
		List<Position> positions = new ArrayList<Position>();

		try {
			ps = connection.prepareStatement("call RETRIEVE_ATTRIBUTE_TYPE_PEOPLE");
			rs = ps.executeQuery();
			while (rs.next()) {
				Person person = new Person();
				person.setAttribute_id(rs.getInt("ATTR_ID"));
				person.setKey(rs.getString("ATTR_KEY"));
				person.setOrder(rs.getInt("ATTR_ORDER"));
				person.setIs_visible(rs.getBoolean("IS_VISIBLE"));
				persons.add(person);
				attributeMessages.setPerson(persons);

			}

			ps = connection.prepareStatement("call RETRIEVE_ATTRIBUTE_TYPE_POSITION");
			rs = ps.executeQuery();
			while (rs.next()) {
				Position position = new Position();
				position.setAttribute_id(rs.getInt("ATTR_ID"));
				position.setKey(rs.getString("ATTR_KEY"));
				position.setOrder(rs.getInt("ATTR_ORDER"));
				position.setIs_visible(rs.getBoolean("IS_VISIBLE"));
				positions.add(position);
				attributeMessages.setPosition(positions);

			}

			attributeMessages.setStatus(statusMessages.GetStatus(StatusMessage.status.OK));
			attributeMessages.setMessage("Persons retrieved successfully");

			rs.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return attributeMessages;
	}

	public List<Integer> getPositionId() {
		PreparedStatement ps;
		ResultSet rs;
		List<Integer> posId = new ArrayList<>();

		try {
			ps = connection.prepareStatement("select position_id from position");
			rs = ps.executeQuery();
			while (rs.next()) {
				posId.add(rs.getInt("POSITION_ID"));
			}

			rs.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return posId;

	}

	public List<Integer> getPersonId() {
		PreparedStatement ps;
		ResultSet rs;
		List<Integer> perId = new ArrayList<>();

		try {
			ps = connection.prepareStatement("select person_id from person");
			rs = ps.executeQuery();
			while (rs.next()) {
				perId.add(rs.getInt("PERSON_ID"));
			}

			rs.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return perId;

	}

}
