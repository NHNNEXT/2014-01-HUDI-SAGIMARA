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

		UserProfileDAO UserProfileDAO = new UserProfileDAO(conn); 
		UserProfile result = new UserProfile();
		try {		
			result = UserProfileDAO.selectById(id);
			
			if(result != null) {
				logger.info("[readUserProfile] User[" + id + "] 정보 있음 ");
				Inquiry inquiry = new Inquiry();
				inquiry.setInquiryId(id);
				
				dbm.add(conn, inquiry);
			} else {
				logger.info("[readUserProfile] User[" + id + "] 정보 없음 ");
				User user = new User(id, "false", "1", "위치정보 없음");
				Inquiry inquiry = new Inquiry(user);

				dbm.add(conn, user);
				dbm.add(conn, inquiry);
				
				result = UserProfileDAO.selectById(id);
			}
						
			logger.info("[database] Connection is closed.");
			conn.close();
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return result;
	}

	public boolean insertLocation(String phone, String time, String cordinate) {
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
