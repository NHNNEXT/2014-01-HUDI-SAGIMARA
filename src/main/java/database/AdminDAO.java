package database;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import logger.SagimaraLogger;

import org.apache.log4j.Logger;

import dto.Admin;

public class AdminDAO {
	private Connection conn;
	private DatabaseConnector connector;
	private Logger logger = SagimaraLogger.logger;
	
	public AdminDAO() {
		this.connector = new DatabaseConnector();
	}

	public Admin selectById(String id) throws SQLException {
		conn = connector.getMysqlConnection();
		String sql = "select * from " + "ADMIN" + " where  admin_id = ?";
		PreparedStatement pstmt = conn.prepareStatement(sql);
		pstmt.setString(1, id);
		ResultSet rs = pstmt.executeQuery();

		Admin admin = null;

		if (rs.next()) {
			admin = new Admin(rs.getString("admin_id"),
					rs.getString("admin_password"), rs.getString("admin_name"),
					rs.getString("admin_email"), rs.getString("admin_status"));
		}
		
		rs.close();
		pstmt.close();
		conn.close();

		return admin;
	}

	public void add(Admin admin) throws SQLException {
		conn = connector.getMysqlConnection();
		String tableName = admin.getTableName();

		String sql = "INSERT INTO " + tableName + " VALUES (?, ?, ?, ?, ?)";

		PreparedStatement pstmt = conn.prepareStatement(sql);
		setValuesForAdd(admin, pstmt);

		int result = pstmt.executeUpdate();

		resultLog(admin, tableName, result);

		pstmt.close();
		conn.close();
	}

	private void resultLog(Admin admin, String tableName, int result) {
		if (result == 1) {
			logger.info(String.format("Add Complete %s : %s, %s, %s, %s, %s",
					tableName, admin.getAdminId(), admin.getAdminPassword(),
					admin.getAdminName(), admin.getAdminEmail(),
					admin.getAdminStatus()));
		} else {
			logger.info("Add Fail " + tableName);
		}
	}

	private void setValuesForAdd(Admin admin, PreparedStatement pstmt)
			throws SQLException {
		pstmt.setString(1, admin.getAdminId());
		pstmt.setString(2, admin.getAdminPassword());
		pstmt.setString(3, admin.getAdminName());
		pstmt.setString(4, admin.getAdminEmail());
		pstmt.setString(5, admin.getAdminStatus());
	}
}
