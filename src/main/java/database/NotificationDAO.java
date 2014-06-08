package database;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import logger.SagimaraLogger;

import org.apache.log4j.Logger;

import dto.Notification;
import dto.RequestList;
import dto.UserInquiry;


public class NotificationDAO {
	private Connection conn;
	private DatabaseConnector connector;
	private Logger logger = SagimaraLogger.logger;

	public NotificationDAO() {
		this.connector = new DatabaseConnector();
		this.conn = connector.getMysqlConnection();
	}

	public void add(dto.Notification notification) throws SQLException {
		String tableName = notification.getTableName();
		String sql = "INSERT INTO "
				+ tableName
				+ " VALUES (?, ?, ?, ?)";

		PreparedStatement pstmt = conn.prepareStatement(sql);
		pstmt.setString(1, notification.getNotificationFrom());
		pstmt.setString(2, notification.getNotificationTo());
		pstmt.setString(3, notification.getNotificationDate());
		pstmt.setString(4, notification.getNotificationText());	
		
		int result = pstmt.executeUpdate();

		if (result == 1) {
			logger.info(String.format("Add Complete %s : %s, %s, %s, %s",
					tableName,notification.getNotificationFrom(),
					notification.getNotificationTo(),
					notification.getNotificationDate(),
					notification.getNotificationText()));
		} else {
			logger.info("Add Fail " + tableName);
		}
		
		pstmt.close();
		conn.close();
	}

	public UserInquiry selectForGraph() throws SQLException {
		String sql = "select "
				+ "count(if(notify_time=(CURRENT_DATE()-INTERVAL 6 DAY),notify_time,null))  AS '6day ago',"
				+ "count(if(notify_time=(CURRENT_DATE()-INTERVAL 5 DAY),notify_time,null))  AS '5day ago',"
				+ "count(if(notify_time=(CURRENT_DATE()-INTERVAL 4 DAY),notify_time,null))  AS '4day ago',"
				+ "count(if(notify_time=(CURRENT_DATE()-INTERVAL 3 DAY),notify_time,null))  AS '3day ago',"
				+ "count(if(notify_time=(CURRENT_DATE()-INTERVAL 2 DAY),notify_time,null))  AS '2day ago',"
				+ "count(if(notify_time=(CURRENT_DATE()-INTERVAL 1 DAY),notify_time,null))  AS '1day ago',"
				+ "count(if(notify_time=(CURRENT_DATE()),notify_time,null))  AS 'today'"
				+ "from NOTIFICATION";
		
		PreparedStatement pstmt = conn.prepareStatement(sql);
		ResultSet rs = pstmt.executeQuery();
		UserInquiry userInquiry = null;

		if (rs.next()) {
			userInquiry = new UserInquiry(null,
										rs.getString("today"), 
										rs.getString("1day ago"),
										rs.getString("2day ago"), 
										rs.getString("3day ago"),
										rs.getString("4day ago"));
		}

		pstmt.close();
		rs.close();
		conn.close();

		return userInquiry;
		
	}

	public ArrayList<Notification> getList(int count) throws SQLException {
		String sql = "select * from NOTIFICATION order by notify_time desc Limit ?";

		PreparedStatement pstmt = conn.prepareStatement(sql);
		pstmt.setInt(1, count);
		ResultSet rs = pstmt.executeQuery();

		ArrayList<Notification> requestList = new ArrayList<Notification>() ;
		
		
		while (rs.next()) {
			Notification req = new Notification(rs.getString("notifty_from"),
												rs.getString("notify_to"),
												rs.getString("notify_time"),
												rs.getString("notify_detail"));
			requestList.add(req);
		}

		pstmt.close();
		rs.close();
		conn.close();
		
		return requestList;
	}
}