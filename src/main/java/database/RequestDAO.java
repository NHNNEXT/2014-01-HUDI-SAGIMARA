package database;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import logger.SagimaraLogger;

import org.apache.log4j.Logger;

import dto.Request;

public class RequestDAO {
	private Connection conn;
	Logger logger = SagimaraLogger.logger;

	public RequestDAO(Connection conn) {
		this.conn = conn;
	}

	public ArrayList<Request> selectByToPhoneNumberAndLatestDate(
			String userPhone, String latestDate) throws SQLException {
		String sql = "SELECT * FROM " + "REQUEST"
				+ " WHERE request_to = ? AND request_date > ?";
		PreparedStatement pstmt;
		ResultSet rs;
		ArrayList<Request> resultList = new ArrayList<Request>();
		pstmt = conn.prepareStatement(sql);
		pstmt.setString(1, userPhone);
		pstmt.setString(2, latestDate);
		rs = pstmt.executeQuery();

		while (rs.next()) {
			resultList.add(new Request(rs.getString("request_from"), rs
					.getString("request_to"), rs.getString("request_date")));
		}
		return resultList;
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
			logger.info("Add Complete " + tableName + ","
					+ request.getRequestFrom() + "," + request.getRequestTo()
					+ "," + request.getRequestDate());
		} else {
			logger.info("Add Fail " + tableName);
		}

		pstmt.close();
	}
}
