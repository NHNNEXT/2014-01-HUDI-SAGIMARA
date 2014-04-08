package framework;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

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
		String user = "sagimara";
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
	public DatabaseUserTable readtable(String table, String key) {
		DatabaseUserTable result = new DatabaseUserTable();

		try {
			sql = "select * from " + table + " where id = ?";
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, key);
			rs = pstmt.executeQuery();
			while(rs.next()) {
				result.setId(rs.getString("id"));
				result.setName(rs.getString("name"));
			}
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


}
