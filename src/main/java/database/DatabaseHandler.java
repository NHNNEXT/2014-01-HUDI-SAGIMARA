package database;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;

import logger.SagimaraLogger;
import model.Inquiry;
import model.User;
import model.UserProfile;

import org.apache.log4j.Logger;

public class DatabaseHandler {
	Logger logger;
	DatabaseManager dbm;
	
	public DatabaseHandler() {
		logger = SagimaraLogger.logger;
		dbm = new DatabaseManager();
	}
	
	private Connection connect(){
		DatabaseConnector connector = new DatabaseConnector();
		
		Connection conn = connector.getMysqlConnection();
		
		if(conn==null){
			logger.error("Database Connection Error");
		}
		return conn;
	}
	
	
	public UserProfile readUserProfile(String id) {
		
		Connection conn = this.connect();
		
		
		UserProfile result = new UserProfile();

		try {
			ResultSet rs_profile = dbm.select(conn, new UserProfile(), id);
			ResultSet rs_inquiry = dbm.select(conn, new Inquiry(), id);
			
			//logger.info("[readUserProfile] ResultSet : " + rs_profile.toString()
			//		+ " : ");
			if (rs_profile.next()&&rs_inquiry.next()) {
				logger.info("[readUserProfile] User[" + id + "] 정보 있음 ");
				Inquiry inquiry = new Inquiry();
				inquiry.setInquiryId(id);

				dbm.add(conn, inquiry);

				result.setProfilePhone(rs_profile.getString("phone_number"));
				result.setProfileStatus(rs_profile.getString("status"));
				result.setProfileVerification(rs_profile.getString("verification"));
				result.setProfileLocation(rs_profile.getString("location"));
				result.setProfileWatch(rs_profile.getString("watch"));
				result.setProfileNotify(rs_profile.getString("notify"));
				String[] inquiryList = { rs_inquiry.getString("4day ago"),
						rs_inquiry.getString("3day ago"), rs_inquiry.getString("2day ago"),
						rs_inquiry.getString("1day ago"), rs_inquiry.getString("today") };
				result.setProfileInquiry(inquiryList);
			} else {
				logger.info("[readUserProfile] User[" + id + "] 정보 없음 ");
				User user = new User(id, "false", "1", "위치정보 없음");
				Inquiry inquiry = new Inquiry(user);

				dbm.add(conn, user);
				dbm.add(conn, inquiry);

				result.setProfilePhone(user.getUserPhone());
				result.setProfileStatus("1");
				result.setProfileVerification("false");
				result.setProfileLocation("위치정보 없음");
				result.setProfileWatch("0");
				result.setProfileNotify("0");
				String[] inquiryList = { "0", "0", "0", "0", "0" };
				result.setProfileInquiry(inquiryList);
			}
			rs_profile.close();
			rs_inquiry.close();
			logger.info("[database] Connection is closed.");
			conn.close();
			
		} catch (SQLException e) {
			logger.info("[database] Connection is closed.");
			e.printStackTrace();
		}
		
		return result;
	}

}
