package database;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import logger.SagimaraLogger;

import org.apache.log4j.Logger;

import dto.Verification;
import dto.VerificationListForVerify;

public class VerificationDAO {
	private Connection conn;
	private DatabaseConnector connector;
	private Logger logger = SagimaraLogger.logger;
	
	public VerificationDAO() {
		this.connector = new DatabaseConnector();
	}

	public Verification selectById(String userPhone) throws SQLException {
		conn = connector.getMysqlConnection();
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
		conn.close();

		return verification;
	}

	public void add(Verification verification) throws SQLException {
		conn = connector.getMysqlConnection();
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
			pstmt.close();
			conn.close();
		}

		pstmt.close();
		conn.close();
	}

	public ArrayList<Verification> getList(int count) throws SQLException{
		conn = connector.getMysqlConnection();
		String sql = "select USER_user_phone,user_status,verification_time from VERIFICATION order by verification_time desc Limit ?";
		PreparedStatement pstmt = conn.prepareStatement(sql);
		pstmt.setInt(1, count);
		ResultSet rs = pstmt.executeQuery();

		ArrayList<Verification> verification = new ArrayList<Verification>() ;
		
		
		while (rs.next()) {
			Verification verifi = new Verification(rs.getString("USER_user_phone"),
													rs.getString("verification_time"),
													rs.getString("user_status"));
			verification.add(verifi);
		}

		rs.close();
		pstmt.close();
		conn.close();

		return verification;
	}
	
	public ArrayList<VerificationListForVerify> selectForAdminOrderBy(
			int maxRow, int pageNum, String condition) throws SQLException {
		conn = connector.getMysqlConnection();	
		String sql = "select " +
				"v.USER_user_phone		AS 'phone_number', " +
				"v.verification_time	AS 'verification_time', " +
				"v.user_status 			AS 'verification_status', " +
		        "u.user_status 			AS 'current_status', " +
		        "u.user_verification 	AS 'verification', " +
		        "u.user_area 			AS 'location', " +
				"l.location_coordinate  AS 'location_coordinate', " +
				"l.location_time		AS 'location_time', " +
				"i.video_link			AS 'video_link', " +
				"i.video_date			AS 'video_date' " +
				"from VERIFICATION as v " + 
				"left join USER as u ON (v.USER_user_phone = u.user_phone ) " +
				"left join LOCATION as l ON (v.USER_user_phone = l.USER_user_phone) " +
				"left join VIDEO as i ON (v.USER_user_phone = i.USER_user_phone) " +
				"order by ? desc limit ? " ;

		PreparedStatement pstmt = conn.prepareStatement(sql);
		pstmt.setString(1, condition);
		
		if(pageNum==0){
			pstmt.setInt(2, maxRow);
		}else{
			String paging = String.valueOf(pageNum * maxRow) + ", " + String.valueOf(maxRow);
			pstmt.setString(2, paging);
		}

		ResultSet rs = pstmt.executeQuery();

		ArrayList<VerificationListForVerify> result = new ArrayList<VerificationListForVerify>() ;
		
		
		while (rs.next()) {
			VerificationListForVerify rlv = new VerificationListForVerify(
												notNull(rs.getString("phone_number")),
												notNull(rs.getString("verification_time")),
												notNull(rs.getString("verification_status")),
												notNull(rs.getString("current_status")),
												notNull(rs.getString("verification")),
												notNull(rs.getString("location")),
												notNull(rs.getString("location_coordinate")),
												notNull(rs.getString("location_time")),
												notNull(rs.getString("video_link")),
												notNull(rs.getString("video_date")));
			result.add(rlv);
		}
		pstmt.close();
		rs.close();
		conn.close();		
		return result;
	}
	
	private String notNull(String data) {
		if(data==null){
			return "";
		}
		return data;
	}
}
