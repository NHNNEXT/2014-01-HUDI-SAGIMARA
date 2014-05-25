package database;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;

import logger.SagimaraLogger;

import org.apache.log4j.Logger;

import dto.Admin;
import dto.Inquiry;
import dto.Location;
import dto.Request;
import dto.User;
import dto.UserProfile;
import dto.Video;

public class DatabaseHandler {
	Logger logger;
	DatabaseManager dbm;

	public DatabaseHandler() {
		logger = SagimaraLogger.logger;
		dbm = new DatabaseManager();
	}

	private Connection connect() {
		DatabaseConnector connector = new DatabaseConnector();

		Connection conn = connector.getMysqlConnection();

		if (conn == null) {
			logger.error("Database Connection Error");
		}
		return conn;
	}

	public UserProfile readUserProfile(String id) {

		Connection conn = this.connect();

		UserProfileDAO userProfileDAO = new UserProfileDAO(conn); 
		UserDAO userDAO = new UserDAO(conn);
		InquiryDAO inquiryDAO = new InquiryDAO(conn); 
		UserProfile userProfile = new UserProfile();
		try {		
			userProfile = userProfileDAO.selectById(id);
			
			if(userProfile != null) {
				logger.info("[readUserProfile] User[" + id + "] 정보 있음 ");
				Inquiry inquiry = new Inquiry();
				inquiry.setInquiryId(id);
				
				inquiryDAO.add(inquiry);
				
			} else {
				logger.info("[readUserProfile] User[" + id + "] 정보 없음 ");
				User user = new User(id, "false", "1", "위치정보 없음");
				Inquiry inquiry = new Inquiry(user);

				userDAO.add(user);
				inquiryDAO.add(inquiry);
				
				userProfile = userProfileDAO.selectById(id);
			}
						
			logger.info("[database] Connection is closed.");
			conn.close();
			
		} catch (SQLException e) {
			logger.info("readUserProfile Fail");
			e.printStackTrace();
		}

		return userProfile;
	}

	public boolean insertLocation(String phone, String time, String cordinate) {
		Connection conn = this.connect();
		Location location = new Location();
		LocationDAO locationDAO = new LocationDAO(conn); 

		location.setLocationId(phone);
		location.setLocationTime(time);
		location.setLocationCoordinate(cordinate);

		try {
			locationDAO.add(location);
			conn.close();
			return true;
		} catch (SQLException e) {
			logger.info("insertLocation Fail");
			e.printStackTrace();
		}
		return false;
	}

	public boolean insertPhoto(String phone, String videoLink, String time) {
		Connection conn = this.connect();
		Video video = new Video();
		VideoDAO videoDAO = new VideoDAO(conn);
		
		video.setVideoId(phone);
		video.setVideoLink(videoLink);
		video.setVideoDate(time);

		try {
			videoDAO.add(video);
			conn.close();
			return true;
		} catch (SQLException e) {
			logger.info("insertPhoto Fail");
			e.printStackTrace();
		}

		return false;
	}

	public boolean insertRequest(String from, String to, String date) {
		Connection conn = this.connect();
		Request request = new Request();
		RequestDAO requestDAO = new RequestDAO(conn);
		
		request.setRequestFrom(from);
		request.setRequestTo(to);
		request.setRequestDate(date);

		try {
			requestDAO.add(request);
			conn.close();
			return true;
		} catch (SQLException e) {
			logger.info("insertRequest Fail");
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
			if (result.next()) {
				dbPassword = result.getString("admin_password");
				if (dbPassword.equals(password)) {
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
