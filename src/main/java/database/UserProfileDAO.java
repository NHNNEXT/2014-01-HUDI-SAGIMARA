package database;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import dto.UserInquiry;
import dto.UserProfile;

public class UserProfileDAO {
	private Connection conn;

	public UserProfileDAO(Connection conn) {
		this.conn = conn;
	}

	public UserProfile selectById(String id) throws SQLException {
		String sql = "select * from " + "USER_PROFILE" + " where phone_number = ?";
		PreparedStatement pstmt;
		ResultSet rs;
		pstmt = conn.prepareStatement(sql);
		pstmt.setString(1, id);
		rs = pstmt.executeQuery();
		
		UserProfile userProfile = null;
		UserInquiry userInquiry = null;
		
		UserInquiryDAO userInquiryDAO = new UserInquiryDAO(conn);
		userInquiry = userInquiryDAO.selectById(id);
		
		if(rs.next()) {
			userProfile = new UserProfile(rs.getString("phone_number"), rs.getString("status"), rs.getString("verification"), rs.getString("location"), rs.getString("watch"), rs.getString("notify"), userInquiry);
		}
		return userProfile;
	}
	
	public UserProfile setDefault(String id) {
		return null;
		
	}
}
