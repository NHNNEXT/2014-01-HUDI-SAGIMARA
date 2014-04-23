package database;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.apache.log4j.Logger;

import logger.SagimaraLogger;
import model.UserProfile;

public class DatabaseHandler {
	Connection conn;
	Logger logger;
	DatabaseManager dbm;
	
	public DatabaseHandler(){
		logger = SagimaraLogger.logger;
		dbm = new DatabaseManager();
	}
	
	public void Connect(){
		DatabaseConnector connector = new DatabaseConnector();
		
		//mysql Connection
		conn = connector.getMysqlConnection();
		
		if(conn==null){
			logger.error("Database Connection Error");
		}
	}
	
	public UserProfile readUserProfile(String id) {
		UserProfile result = new UserProfile();
		
		try {
			ResultSet rs = dbm.selectUserProfile(conn, id);

			if (rs.next()) {
				// 검색결과가 있을때
				result.setProfilePhone(rs.getString("profile_phone"));
				result.setProfileInquiry(rs.getString("profile_inquiry"));
				result.setProfileLocation(rs.getString("profile_location"));
				result.setProfileStatus(rs.getString("profile_status"));
				result.setProfileVerification(rs.getString("profile_verification"));
				result.setProfileVideo(rs.getString("profile_video"));
			} else {
				// 검색결과가 없을때
				result.setProfilePhone("검색결과 없음");
				result.setProfileInquiry("검색결과 없음");
				result.setProfileLocation("검색결과 없음");
				result.setProfileStatus("검색결과 없음");
				result.setProfileVerification("검색결과 없음");
				result.setProfileVideo("검색결과 없음");
			}

		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		
		return result;
	}
	
}
