package database;

import java.sql.Connection;

import dto.BaseModel;

public class UserDAO {
	private Connection conn;

	public UserDAO(Connection conn) {
		this.conn = conn;
	}
	
	public void add(Connection conn, BaseModel model) {
		
	}
}
