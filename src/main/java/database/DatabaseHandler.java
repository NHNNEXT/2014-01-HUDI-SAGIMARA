package database;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import logger.SagimaraLogger;

import org.apache.log4j.Logger;

import dto.Admin;
import dto.Inquiry;
import dto.Location;
import dto.Request;
import dto.User;
import dto.UserProfile;
import dto.Verification;
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

	public ArrayList<Request> getRequestsWithVerificationTime(String phoneNumber){
		Connection conn = this.connect();
		//
		VerificationDAO verificationDAO = new VerificationDAO(conn);
		Verification verification; 
		String verificationLatestTime;
		ArrayList<Request> resultList;
		try {
			verification = verificationDAO.selectById(phoneNumber);
			
			if(verification != null){
				verificationLatestTime = verification.getVerificationTime();
				resultList = new RequestDAO(conn).selectByToPhoneNumberAndLatestDate(phoneNumber, verificationLatestTime);
				return resultList;
			}else{
				//2014가 의미하는 것은 verification이 없을 경우에 모든 Request의 목록을 구해와야 하기 때문
				verificationLatestTime = "2014";
				resultList = new RequestDAO(conn).selectByToPhoneNumberAndLatestDate(phoneNumber, verificationLatestTime);
				return resultList;
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return null;
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
