package database;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import logger.SagimaraLogger;

import org.apache.log4j.Logger;

import dto.UserInquiry;
import dto.UserProfile;

public class UserProfileDAO {
	private Connection conn;
	private DatabaseConnector connector;
	private Logger logger = SagimaraLogger.logger;
	
	public UserProfileDAO() {
		this.connector = new DatabaseConnector();
		this.conn = connector.getMysqlConnection();
	}

	public UserProfile selectById(String id) throws SQLException {
		String sql = "select * from " + "USER_PROFILE"
				+ " where phone_number = ?";
		PreparedStatement pstmt = conn.prepareStatement(sql);
		pstmt.setString(1, id);
		ResultSet rs = pstmt.executeQuery();

		UserProfile userProfile = null;

		UserInquiryDAO userInquiryDAO = new UserInquiryDAO(conn);
		UserInquiry userInquiry = userInquiryDAO.selectById(id);

		if (rs.next()) {
			userProfile = new UserProfile(rs.getString("phone_number"),
					rs.getString("status"), rs.getString("verification"),
					rs.getString("location"), rs.getString("watch"),
					rs.getString("notify"), userInquiry);
		}

		pstmt.close();
		rs.close();

		return userProfile;
	}

}
