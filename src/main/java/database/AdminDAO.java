package database;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import dto.Admin;
import dto.UserInquiry;

public class AdminDAO {
	private Connection conn;

	public AdminDAO(Connection conn) {
		this.conn = conn;
	}

	public Admin selectById(String id) throws SQLException {
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

		pstmt.close();
		rs.close();

		return admin;
	}
}
