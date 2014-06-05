package database;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import logger.SagimaraLogger;

import org.apache.log4j.Logger;

import dto.Verification;

public class VerificationDAO {
	private Connection conn;
	private DatabaseConnector connector;
	private Logger logger = SagimaraLogger.logger;
	
	public VerificationDAO() {
		this.connector = new DatabaseConnector();
		this.conn = connector.getMysqlConnection();
	}

	public VerificationDAO(Connection conn) {
		this.conn = conn;
	}

	public Verification selectById(String userPhone) throws SQLException {
		String sql = "select * from " + "VERIFICATION"
				+ " where USER_user_phone = ?";
		PreparedStatement pstmt = conn.prepareStatement(sql);
		pstmt.setString(1, userPhone);
		ResultSet rs = pstmt.executeQuery();

		Verification verification = null;
		if (rs.next()) {
			verification = new Verification(rs.getString("USER_user_phone"),
											rs.getString("verification_time"),
											rs.getString("user_status"));
		}

		pstmt.close();
		rs.close();

		return verification;
	}

	public void add(Verification verification) throws SQLException {
		String tableName = verification.getTableName();

		String sql = "INSERT INTO " + tableName + " (USER_user_phone,user_status,verification_time) VALUES (?, ?, ?)";

		PreparedStatement pstmt = conn.prepareStatement(sql);
		pstmt.setString(1, verification.getVerificationId());
		pstmt.setString(2, verification.getVerificationStatus());
		pstmt.setString(3, verification.getVerificationTime());
		
		int result = pstmt.executeUpdate();

		if (result == 1) {
			logger.info(String.format("Add Complete %s : %s, %s, %s", tableName,
					verification.getVerificationId(),
					verification.getVerificationStatus(),
					verification.getVerificationTime()));
		} else {
			logger.info("Add Fail " + tableName);
		}

		pstmt.close();
	}
}
