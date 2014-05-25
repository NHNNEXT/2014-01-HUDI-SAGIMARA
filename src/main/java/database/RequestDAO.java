package database;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import logger.SagimaraLogger;

import org.apache.log4j.Logger;

import dto.Request;

public class RequestDAO {
	private Connection conn;
	Logger logger = SagimaraLogger.logger;

	public RequestDAO(Connection conn) {
		this.conn = conn;
	}
	
	public void add(Request request) throws SQLException {
		String tableName = request.getTableName();
		String sql = "INSERT INTO " + tableName + " VALUES (?, ?, ?)";

		PreparedStatement pstmt = conn.prepareStatement(sql);
		pstmt.setString(1, request.getRequestFrom());
		pstmt.setString(2, request.getRequestTo());
		pstmt.setString(3, request.getRequestDate());
		
		int result = pstmt.executeUpdate();
		
		if (result == 1) {
			logger.info("Add Complete " + tableName + " : " + request.getRequestFrom() + "," + request.getRequestTo() + "," + request.getRequestDate());
		} else {
			logger.info("Add Fail " + tableName);
		}
		
		pstmt.close();
	}
}
