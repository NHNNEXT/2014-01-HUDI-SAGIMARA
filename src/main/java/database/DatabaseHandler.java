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
	
	public DatabaseHandler(){
		logger = SagimaraLogger.logger;
		dbm = new DatabaseManager();		
	}
	
	public UserProfile readUserProfile(String id) {
		UserProfile result = new UserProfile();
		
		try {
			ResultSet rs = dbm.selectUserProfile(id);
			logger.info("[readUserProfile] ResultSet : " + rs.toString() + " : " );
			if (rs.next()) {
				logger.info("[readUserProfile] User["+id+"] 정보 있음 ");
				Inquiry inquiry = new Inquiry();
				inquiry.setInquiryId(id);
				
				dbm.add(inquiry);
				
				result.setProfilePhone(rs.getString("phone_number"));
				result.setProfileStatus(rs.getString("status"));
				result.setProfileVerification(rs.getString("verification"));
				result.setProfileLocation(rs.getString("location"));
				result.setProfileWatch(rs.getString("watch"));
				result.setProfileNotify(rs.getString("notify"));	
				String[] inquiryList = {rs.getString("6day ago"),rs.getString("5day ago"),rs.getString("4day ago"),
						rs.getString("3day ago"),rs.getString("2day ago"),rs.getString("1day ago"),rs.getString("today")};
				result.setProfileInquiry(inquiryList);
			} else {
				logger.info("[readUserProfile] User["+id+"] 정보 없음 ");
				User user = new User(id, "false", "1", "위치정보 없음");
				Inquiry inquiry = new Inquiry(user);
				
				dbm.add(user);
				dbm.add(inquiry);
				
				result.setProfilePhone(user.getUserPhone());
				result.setProfileStatus("1");
				result.setProfileVerification("false");
				result.setProfileLocation("위치정보 없음");
				result.setProfileWatch("0");
				result.setProfileNotify("0");
			}
			rs.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return result;
	}
	
	
	
}
