package database;

import java.sql.PreparedStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;

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
		if(rs.next()) {
			userProfile = new UserProfile(rs.getString("phone_number"), rs.getString("status"), rs.getString("verification"), rs.getString("video"), rs.getString("location"), rs.getString("watch"), rs.getString("notify"));
		}
		return userProfile;
	}
}
