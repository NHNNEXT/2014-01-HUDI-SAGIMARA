package database;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import dto.UserInquiry;

public class UserInquiryDAO {
	private Connection conn;
	private DatabaseConnector connector;
	
	public UserInquiryDAO() {
		this.connector = new DatabaseConnector();
		this.conn = connector.getMysqlConnection();
	}

	public UserInquiry selectById(String id) throws SQLException {
		String sql = "select * from " + "USER_INQUIRY"
				+ " where phone_number = ?";
		PreparedStatement pstmt = conn.prepareStatement(sql);
		pstmt.setString(1, id);
		ResultSet rs = pstmt.executeQuery();

		UserInquiry userInquiry = null;

		if (rs.next()) {
			userInquiry = new UserInquiry(rs.getString("phone_number"),
					rs.getString("today"), rs.getString("1day ago"),
					rs.getString("2day ago"), rs.getString("3day ago"),
					rs.getString("4day ago"));
		}

		pstmt.close();
		rs.close();

		return userInquiry;
	}
}
