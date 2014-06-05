package database;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;

import logger.SagimaraLogger;

import org.apache.log4j.Logger;

import utility.JsonBuilder;
import dto.Admin;
import dto.Inquiry;
import dto.Location;
import dto.Request;
import dto.User;
import dto.UserProfile;
import dto.Verification;
import dto.Video;

public class DatabaseHandler {
	private Logger logger = SagimaraLogger.logger;
	private static DatabaseHandler instance = new DatabaseHandler();

	private DatabaseHandler() {}
	
	public static DatabaseHandler getDatabaseHandler() {
		return instance;
	}

	private Connection connect() {
		DatabaseConnector connector = new DatabaseConnector();

		Connection conn = connector.getMysqlConnection();

		if (conn == null) {
			logger.error("Database Connection Error");
		}
		return conn;
	}

	public ArrayList<Request> getRequestsWithVerificationTime(String phoneNumber) {
		Connection conn = this.connect();
		//
		VerificationDAO verificationDAO = new VerificationDAO(conn);
		Verification verification;
		String verificationLatestTime;
		ArrayList<Request> resultList;
		try {
			verification = verificationDAO.selectById(phoneNumber);

			if (verification != null) {
				verificationLatestTime = verification.getVerificationTime();
				resultList = new RequestDAO(conn)
						.selectByToPhoneNumberAndLatestDate(phoneNumber,
								verificationLatestTime);
				return resultList;
			} else {
				// 2014가 의미하는 것은 verification이 없을 경우에 모든 Request의 목록을 구해와야 하기 때문
				verificationLatestTime = "2014";
				resultList = new RequestDAO(conn)
						.selectByToPhoneNumberAndLatestDate(phoneNumber,
								verificationLatestTime);
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

		UserProfileDAO userProfileDAO = new UserProfileDAO(conn);
		UserDAO userDAO = new UserDAO(conn);
		InquiryDAO inquiryDAO = new InquiryDAO(conn);
		UserProfile userProfile = new UserProfile();
		try {
			userProfile = userProfileDAO.selectById(id);

			if (userProfile != null) {
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
		Admin dbAdmin = new Admin();
		AdminDAO adminDAO = new AdminDAO(conn);

		admin.setAdminId(id);
		admin.setAdminPassword(password);

		try {
			dbAdmin = adminDAO.selectById(id);
			
			if (dbAdmin == null) {
				conn.close();
				return 2;
			} else if (dbAdmin.getAdminPassword().equals(password)) {
				conn.close();
				return 0;
			} else {
				conn.close();
				return 1;
			}

		} catch (SQLException e) {
			e.printStackTrace();
		}
		return -1;
	}

	public int CheckForAdminRegister(String id, String password, String email, String name) {
		Connection conn = this.connect();
		Admin admin = new Admin();
		Admin dbAdmin = new Admin();
		AdminDAO adminDAO = new AdminDAO(conn);

		logger.info(String.format("CheckForAdminRegister %s, %s, %s, %s",
				id, password, email,
				name));
		admin.setAdminId(id);
		admin.setAdminPassword(password);
		admin.setAdminName(name);
		admin.setAdminEmail(email);
		admin.setAdminStatus("1");

		try {
			dbAdmin = adminDAO.selectById(id);
			
			if (dbAdmin == null) {
				adminDAO.add(admin);
				conn.close();
				return 0;
			}  else {
				conn.close();
				return 1;
			}

		} catch (SQLException e) {
			e.printStackTrace();
		}
		return -1;
	}

}
