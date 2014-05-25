package database;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

import logger.SagimaraLogger;

import org.apache.log4j.Logger;

import dto.Admin;
import dto.BaseModel;
import dto.Inquiry;
import dto.Location;
import dto.Request;
import dto.User;
import dto.Verification;
import dto.Video;

public class DatabaseManager {
	Logger logger;

	public DatabaseManager() {
		logger = SagimaraLogger.logger;
	}

	public int add(Connection conn, BaseModel model) throws SQLException {
		String tableName = model.getTableName();

		PreparedStatement pstmt = null;
		int result;
		logger.info("[DatabaseManager-add] Table NAME : " + tableName);

		if (tableName.equals("ADMIN")) {
			Admin admin = (Admin) model;

			String sql = "INSERT INTO " + tableName + " VALUES (?, ?, ?, ?, ?, ?)";
			logger.info("[DatabaseManager] Video :" 
					+ admin.getAdminId() + " : " 
					+ admin.getAdminPassword() + " : "
					+ admin.getAdminName() + " : "
					+ admin.getAdminEmail() + " : "
					+ admin.getAdminStatus()) ;
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, admin.getAdminId());
			pstmt.setString(2, admin.getAdminPassword());
			pstmt.setString(3, admin.getAdminName());
			pstmt.setString(4, admin.getAdminEmail());
			pstmt.setString(5, admin.getAdminStatus());
		}
		// ADMIN Page에서 인증 확인을 하면 사용할 로직 
		else if (tableName.equals("VERIFICATION")) {
			Verification verification = (Verification) model;
			
			String sql = "INSERT INTO " + tableName + " VALUES (?, ?)";
			logger.info("[DatabaseManager] Verification :" 
					+ verification.getVerificationId() + " : " 
					+ verification.getVerificationTime() + " : ");
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, verification.getVerificationId());
			pstmt.setString(2, verification.getVerificationTime());
		}

		try {
			result = pstmt.executeUpdate();
			if (result == 1) {
				logger.info("[DatabaseManager] Add " + tableName + " : "
						+ model);
			} else {
				logger.info("[DatabaseManager] Fail Add " + tableName);
			}

			return result;
		} catch (Exception e) {
			logger.error("pDatabaseManager] add Error : " + e.getMessage());
		}
		return 0;
	}

	public ArrayList<String> getColumns(Connection conn, String table) {
		ArrayList<String> columns = new ArrayList<String>();

		String sql = "SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA='sagimara' AND TABLE_NAME='"
				+ table + "'";
		try {
			Statement stmt = conn.createStatement();
			ResultSet rs = stmt.executeQuery(sql);
			while (rs.next()) {
				columns.add(rs.getString(1));
			}

			stmt.close();
			rs.close();

		} catch (SQLException e) {
			e.printStackTrace();
		}

		return columns;
	}
}
