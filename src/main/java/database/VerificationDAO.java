package database;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import dto.Verification;

public class VerificationDAO {
	private Connection conn;

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
					rs.getString("verification_time"));
		}
		
		pstmt.close();
		rs.close();
		
		return verification;
	}
}
