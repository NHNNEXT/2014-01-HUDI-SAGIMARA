package database;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import logger.SagimaraLogger;

import org.apache.log4j.Logger;

import dto.Inquiry;
import dto.UserInquiry;

public class InquiryDAO {
	private Connection conn;
	private DatabaseConnector connector;
	private Logger logger = SagimaraLogger.logger;
	
	public InquiryDAO() {
		this.connector = new DatabaseConnector();
		this.conn = connector.getMysqlConnection();
	}

	public InquiryDAO(Connection conn) {
		this.conn = conn;
	}

	public void add(Inquiry inquiry) throws SQLException {
		String tableName = inquiry.getTableName();

		String sql = "INSERT INTO " + tableName
				+ " (`USER_user_phone`,`inquiry_time`) VALUES (?, ?)";

		PreparedStatement pstmt = conn.prepareStatement(sql);
		pstmt.setString(1, inquiry.getInquiryId());
		pstmt.setString(2, inquiry.getInquiryTime());

		int result = pstmt.executeUpdate();

		if (result == 1) {
			logger.info(String.format("Add Complete %s : %s, %s",
					tableName, inquiry.getInquiryId(), inquiry.getInquiryTime()));
		} else {
			logger.info("Add Fail " + tableName);
		}

		pstmt.close();
	}


	public UserInquiry select() throws SQLException{
		
		String sql = "select "
				+ "count(if(inquiry_time=(CURRENT_DATE()-INTERVAL 6 DAY),inquiry_time,null))  AS '6day ago',"
				+ "count(if(inquiry_time=(CURRENT_DATE()-INTERVAL 5 DAY),inquiry_time,null))  AS '5day ago',"
				+ "count(if(inquiry_time=(CURRENT_DATE()-INTERVAL 4 DAY),inquiry_time,null))  AS '4day ago',"
				+ "count(if(inquiry_time=(CURRENT_DATE()-INTERVAL 3 DAY),inquiry_time,null))  AS '3day ago',"
				+ "count(if(inquiry_time=(CURRENT_DATE()-INTERVAL 2 DAY),inquiry_time,null))  AS '2day ago',"
				+ "count(if(inquiry_time=(CURRENT_DATE()-INTERVAL 1 DAY),inquiry_time,null))  AS '1day ago',"
				+ "count(if(inquiry_time=(CURRENT_DATE()),inquiry_time,null))  AS 'today'"
				+ "from INQUIRY";
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

		return userInquiry;
	}
}
