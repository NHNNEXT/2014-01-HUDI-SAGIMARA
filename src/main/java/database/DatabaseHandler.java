package database;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;

import logger.SagimaraLogger;
import model.BaseModel;
import model.User;
import model.UserProfile;

import org.apache.log4j.Logger;

public class DatabaseHandler {
	Connection conn;
	Logger logger;
	DatabaseManager dbm;
	
	public DatabaseHandler(){
		logger = SagimaraLogger.logger;
		dbm = new DatabaseManager();		
		this.connect();
	}
	
	private void connect(){
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
				result.setProfilePhone(rs.getString("phone_number"));
				result.setProfileStatus(rs.getString("status"));
				result.setProfileVerification(rs.getString("verification"));
				result.setProfileLocation(rs.getString("location"));
				result.setProfileWatch(rs.getString("watch"));
				result.setProfileNotify(rs.getString("notify"));	
				String[] inquiry = {rs.getString("6day ago"),rs.getString("5day ago"),rs.getString("4day ago"),
						rs.getString("3day ago"),rs.getString("2day ago"),rs.getString("1day ago"),rs.getString("today")};
				result.setProfileInquiry(inquiry);
			} else {
				User user = new User(id, "false", "1", "위치정보 없음");
				
				if( dbm.add(conn, user) == 1){
					logger.info("Add User : "+user.getUserPhone());
				}else{
					logger.info("Fail Add User");
				};
				
				result.setProfilePhone("검색결과 없음");
				result.setProfileStatus("검색결과 없음");
				result.setProfileVerification("검색결과 없음");
				result.setProfileLocation("검색결과 없음");
				result.setProfileWatch("검색결과 없음");
				result.setProfileNotify("검색결과 없음");
			}
			rs.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return result;
	}
	
	
	
}
