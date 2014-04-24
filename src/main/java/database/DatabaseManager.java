package database;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

import model.UserProfile;

public class DatabaseManager {
	public ResultSet selectUserProfile(Connection conn, String id) throws SQLException{
		String sql = "select * from USER_PROFILE where phone_number = ?";
		PreparedStatement pstmt = conn.prepareStatement(sql);
		pstmt.setString(1, id);
		ResultSet rs = pstmt.executeQuery();
		return rs;
	}
	
	/**
	 * UserProfile Table에 데이터를 전송
	 * @param conn
	 * @param userProfile
	 * @return
	 * @throws SQLException
	 */
	public int insertUserProfileToData(Connection conn, UserProfile userProfile) throws SQLException{
		String sql = "INSERT INTO USER_PROFILE "
				+ "(profile_phone, profile_status, profile_verification, profile_video, profile_location, profile_inquiry)"
				+ "VALUES (" 
				+ userProfile.getProfilePhone() + ","
				+ userProfile.getProfileStatus() + "," 
				+ userProfile.getProfileVerification() + ","
				+ userProfile.getProfileVideo() + ","
				+ userProfile.getProfileLocation() + ","
				+ userProfile.getProfileInquiry()
				+")";
		
		PreparedStatement pstmt = conn.prepareStatement(sql);
		int rs = pstmt.executeUpdate();
		return rs;
	}
	
	public ArrayList<String> getColumns(Connection conn,String table) {
		ArrayList<String> columns = new ArrayList<String>();
		
		String sql = "SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA='sagimara' AND TABLE_NAME='"+table+"'";
		try {
			Statement stmt = conn.createStatement();
			ResultSet rs = stmt.executeQuery(sql);
			while(rs.next()) {
				columns.add(rs.getString(1));
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return columns;
		
	}
}
