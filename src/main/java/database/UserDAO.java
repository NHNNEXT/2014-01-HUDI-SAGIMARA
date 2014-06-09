package database;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import logger.SagimaraLogger;

import org.apache.log4j.Logger;

import dto.User;
import dto.UserForAdmin;

public class UserDAO {
	private Connection conn;
	private DatabaseConnector connector;
	private Logger logger = SagimaraLogger.logger;
	
	public UserDAO() {
		this.connector = new DatabaseConnector();
	}

	public void add(User user) throws SQLException {
		conn = connector.getMysqlConnection();
		String tableName = user.getTableName();
		String sql = "INSERT INTO " + tableName + " VALUES (?, ?, ?, ?)";

		PreparedStatement pstmt = conn.prepareStatement(sql);
		pstmt.setString(1, user.getUserPhone());
		pstmt.setString(2, user.getUserVerification());
		pstmt.setString(3, user.getUserStatus());
		pstmt.setString(4, user.getUserLocation());

		int result = pstmt.executeUpdate();

		if (result == 1) {
			logger.info(String.format("Add Complete %s : %s, %s, %s, %s",
					tableName, user.getUserPhone(), user.getUserVerification(),
					user.getUserStatus(), user.getUserLocation()));
		} else {
			logger.info("Add Fail " + tableName);
		}

		pstmt.close();
		conn.close();
	}
	
	public ArrayList<UserForAdmin> selectForAdminOrderBy(int maxRow, int pageNum, String orderBy) throws SQLException {
		conn = connector.getMysqlConnection();	
		String sql = "select " +
				"u.user_phone 			AS 'phone_number', " +
		        "u.user_status 			AS 'status', " +
		        "u.user_verification 	AS 'verification', " +
				"r.user_status			AS 'verification_status', " +
				"r.verification_time	AS 'verification_time', " +
		        "u.user_area 			AS 'location', " +
				"l.location_coordinate  AS 'location_coordinate', " +
				"l.location_time		AS 'location_time', " +
				"v.video_link			AS 'video_link', " +
				"v.video_date			AS 'video_date', " +
		        "count(w.watch_to) 		AS 'watch', " +
		        "count(n.notify_to)		AS 'notify' " +
		        "from USER as u " +
				"left join LOCATION as l ON (u.user_phone = l.USER_user_phone) " +
				"left join VIDEO as v ON (u.user_phone = v.USER_user_phone) " +
				"left join WATCH AS w ON (u.user_phone = w.watch_to) " +
				"left JOIN NOTIFICATION AS n ON (u.user_phone = n.notify_to) " +
				"left JOIN VERIFICATION AS r ON (u.user_phone = r.USER_user_phone) " +
				"group by u.user_phone order by ? desc limit ?";

		PreparedStatement pstmt = conn.prepareStatement(sql);
		pstmt.setString(1, orderBy);
		
		if(pageNum==0){
			pstmt.setInt(2, maxRow);
		}else{
			String paging = String.valueOf(pageNum * maxRow) + ", " + String.valueOf(maxRow);
			pstmt.setString(2, paging);
		}

		ResultSet rs = pstmt.executeQuery();

		ArrayList<UserForAdmin> result = new ArrayList<UserForAdmin>() ;
		
		
		while (rs.next()) {
			UserForAdmin ufa = new UserForAdmin(notNull(rs.getString("phone_number")),
												notNull(rs.getString("status")),
												notNull(rs.getString("verification")),
												notNull(rs.getString("verification_status")),
												notNull(rs.getString("verification_time")),
												notNull(rs.getString("location")),
												notNull(rs.getString("location_coordinate")),
												notNull(rs.getString("location_time")),
												notNull(rs.getString("video_link")),
												notNull(rs.getString("video_date")),
												notNull(rs.getString("watch")),
												notNull(rs.getString("notify")));
			result.add(ufa);
		}
		pstmt.close();
		rs.close();
		conn.close();		
		return result;
	}
	
	public User selectById(String id) throws SQLException {
		conn = connector.getMysqlConnection();
		String sql = "select * from " + "USER"
				+ " where user_phone = ?";
		PreparedStatement pstmt = conn.prepareStatement(sql);
		pstmt.setString(1, id);
		ResultSet rs = pstmt.executeQuery();

		User user = null;
		
		if (rs.next()) {
			user = new User(rs.getString("user_phone"),
					rs.getString("user_verification"), rs.getString("user_status"),
					rs.getString("user_area"));
			
		
		}
		return user;
	}

	private String notNull(String data) {
		if(data==null){
			return "";
		}
		return data;
	}
}
