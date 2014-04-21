package database;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

import model.UserProfile;

public class DatabaseByMysql implements DatabaseController {
	Connection conn;
	Statement stmt;
	PreparedStatement pstmt;
	ResultSet rs;
	String sql;

	public DatabaseByMysql() {
		init();
	}

	private void init() {
		String addr = "jdbc:mysql://localhost:3306/sagimara";
		String user = "dev";
		String password = "elqlgkwk"; 
		System.out.println("init");
		try {
			Class.forName("com.mysql.jdbc.Driver");
			System.out.println("jdbc loading");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
		
		try {
			conn = DriverManager.getConnection(addr,user,password);
			stmt = conn.createStatement();
			System.out.println("db connecting");
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
	}
	
	@Override
	public int create() {
		// TODO Auto-generated method stub
		return 0;
	}
	
	@Override
	public int insert() {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public UserProfile readtable(String table, String key) {
		UserProfile result = new UserProfile();

		try {
			sql = "select * from " + table + " where profile_phone = ?";
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, key);
			rs = pstmt.executeQuery();
			
			rs.next();
			result.setProfilePhone(rs.getString("profile_phone"));
			result.setProfileInquiry(rs.getString("profile_inquiry"));
			result.setProfileLocation(rs.getString("profile_location"));
			result.setProfileStatus(rs.getString("profile_status"));
			result.setProfileVerification(rs.getString("profile_verification"));
			result.setProfileVideo(rs.getString("profile_video"));
			
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return result;
	}

	@Override
	public int update(String target, String content) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public int delete() {
		// TODO Auto-generated method stub
		return 0;
	}
	
	@Override
	public ArrayList<String> getColumns(String table) {
		ArrayList<String> columns = new ArrayList<String>();
		sql = "SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA='sagimara' AND TABLE_NAME='"+table+"'";
		try {
			rs = stmt.executeQuery(sql);
			while(rs.next()) {
				columns.add(rs.getString(1));
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return columns;
		
	}


}
