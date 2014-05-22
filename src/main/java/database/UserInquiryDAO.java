package database;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import dto.Inquiry;
import dto.UserInquiry;

public class UserInquiryDAO {
	private Connection conn;

	public UserInquiryDAO(Connection conn) {
		this.conn = conn;
	}
	
	public UserInquiry selectById(String id) throws SQLException {
		String sql = "select * from " + "USER_INQUIRY" + " where phone_number = ?";
		PreparedStatement pstmt;
		ResultSet rs;
		pstmt = conn.prepareStatement(sql);
		pstmt.setString(1, id);
		rs = pstmt.executeQuery();
		UserInquiry userInquiry = null;
		if(rs.next()) {
			//userInquiry = new UserInquiry(rs.getString("4day ago"),rs.getString("3day ago"), rs.getString("2day ago"),rs.getString("1day ago"), rs.getString("today"));
		}
		return userInquiry;
	}
}
