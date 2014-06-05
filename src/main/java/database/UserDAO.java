package database;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import org.apache.log4j.Logger;

import logger.SagimaraLogger;
import dto.User;

public class UserDAO {
	private Connection conn;
	private DatabaseConnector connector;
	private Logger logger = SagimaraLogger.logger;
	
	public UserDAO() {
		this.connector = new DatabaseConnector();
		this.conn = connector.getMysqlConnection();
	}
	public UserDAO(Connection conn) {
		this.conn = conn;
	}

	public void add(User user) throws SQLException {
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
	}
}
