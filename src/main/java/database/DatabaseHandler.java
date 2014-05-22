package database;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;

import logger.SagimaraLogger;
import model.Admin;
import model.Inquiry;
import model.Location;
import model.Request;
import model.User;
import model.UserProfile;
import model.Video;

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
			ResultSet rsProfile = dbm.select(conn, new UserProfile(), id);
			ResultSet rsInquiry = dbm.select(conn, new Inquiry(), id);
			
			if (rsProfile.next()&&rsInquiry.next()) {
				logger.info("[readUserProfile] User[" + id + "] 정보 있음 ");
				Inquiry inquiry = new Inquiry();
				inquiry.setInquiryId(id);

				dbm.add(conn, inquiry);

				result.setProfilePhone(rsProfile.getString("phone_number"));
				result.setProfileStatus(rsProfile.getString("status"));
				result.setProfileVerification(rsProfile.getString("verification"));
				result.setProfileLocation(rsProfile.getString("location"));
				result.setProfileWatch(rsProfile.getString("watch"));
				result.setProfileNotify(rsProfile.getString("notify"));
				String[] inquiryList = { rsInquiry.getString("4day ago"),
						rsInquiry.getString("3day ago"), rsInquiry.getString("2day ago"),
						rsInquiry.getString("1day ago"), rsInquiry.getString("today") };
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
			rsProfile.close();
			rsInquiry.close();
			logger.info("[database] Connection is closed.");
			conn.close();
			
		} catch (SQLException e) {
			logger.info("[database] Connection is closed.");
			e.printStackTrace();
		}
		
		return result;
	}

	public boolean insertLocation(String phone, String time,  String cordinate) {
		Connection conn = this.connect();
		Location location = new Location();
		
		location.setLocationId(phone);
		location.setLocationTime(time);
		location.setLocationCoordinate(cordinate);
		
		try {
			dbm.add(conn, location);
			conn.close();
			return true;
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return false;
	}

	public boolean insertPhoto(String phone, String videoLink, String time) {
		Connection conn = this.connect();
		Video video = new Video();
		video.setVideoId(phone);
		video.setVideoLink(videoLink);
		video.setVideoDate(time);
		
		try {
			dbm.add(conn, video);
			conn.close();
			return true;
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return false;
	}

	public boolean insertRequest(String from, String to, String date) {
		Connection conn = this.connect();		
		Request request = new Request();
		request.setRequestFrom(from);
		request.setRequestTo(to);
		request.setRequestDate(date);
		
		try {
			dbm.add(conn, request);
			conn.close();
			return true;
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return false;
	}

	public int CheckForadminLogin(String id, String password) {
		Connection conn = this.connect();		
		Admin admin = new Admin();
		admin.setAdminId(id);
		admin.setAdminPassword(password);
		
		
		try {
			ResultSet result = dbm.check(conn, admin);
			String dbPassword;
			if(result.next()){
				dbPassword = result.getString("admin_password");
				if(dbPassword.equals(password)){
					conn.close();
					return 0;
				}
				conn.close();
				return 1;
			}
			conn.close();
			return 2;
			
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return -1;
	}

}
