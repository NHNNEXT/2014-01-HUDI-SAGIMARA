package database;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import logger.SagimaraLogger;

import org.apache.log4j.Logger;

import dto.User;

public class UserDAO {
	private Connection conn;
	private DatabaseConnector connector;
	private Logger logger = SagimaraLogger.logger;
	
	public UserDAO() {
		this.connector = new DatabaseConnector();
	}

	public void add(User user) throws SQLException {
		conn = connector.getMysqlConnection();
		String tableName = user.getTableName();
		String sql = "INSERT INTO " + tableName + " VALUES (?, ?, ?, ?)";

		PreparedStatement pstmt = conn.prepareStatement(sql);
		pstmt.setString(1, user.getUserPhone());
		pstmt.setString(2, user.getUserVerification());
		pstmt.setString(3, user.getUserStatus());
		pstmt.setString(4, user.getUserLocation());

		int result = pstmt.executeUpdate();

		if (result == 1) {
			logger.info(String.format("Add Complete %s : %s, %s, %s, %s",
					tableName, user.getUserPhone(), user.getUserVerification(),
					user.getUserStatus(), user.getUserLocation()));
		} else {
			logger.info("Add Fail " + tableName);
		}

		pstmt.close();
		conn.close();
	}
	
	public User selectById(String id) throws SQLException {
		conn = connector.getMysqlConnection();
		String sql = "select * from " + "USER"
				+ " where user_phone = ?";
		PreparedStatement pstmt = conn.prepareStatement(sql);
		pstmt.setString(1, id);
		ResultSet rs = pstmt.executeQuery();

		User user = null;
		
		if (rs.next()) {
			user = new User(rs.getString("user_phone"),
					rs.getString("user_verification"), rs.getString("user_status"),
					rs.getString("user_area"));
		}

		pstmt.close();
		rs.close();
		conn.close();

		return user;
	}
}
