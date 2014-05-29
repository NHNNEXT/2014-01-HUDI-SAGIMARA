package database;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import logger.SagimaraLogger;

import org.apache.log4j.Logger;

import dto.Inquiry;

public class InquiryDAO {
	private Connection conn;
	private Logger logger = SagimaraLogger.logger;

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
}
