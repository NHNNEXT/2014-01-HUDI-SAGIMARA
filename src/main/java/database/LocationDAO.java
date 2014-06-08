package database;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import logger.SagimaraLogger;

import org.apache.log4j.Logger;

import dto.Location;

public class LocationDAO {
	private Connection conn;
	private DatabaseConnector connector;
	private Logger logger = SagimaraLogger.logger;
	
	public LocationDAO() {
		this.connector = new DatabaseConnector();
	}

	public boolean add(Location location) throws SQLException {
		conn = connector.getMysqlConnection();
		
		String tableName = location.getTableName();
		String sql = "INSERT INTO "
				+ tableName
				+ " (`USER_user_phone`,`location_time`,`location_coordinate`) VALUES (?, ?, ?)";

		PreparedStatement pstmt = conn.prepareStatement(sql);
		pstmt.setString(1, location.getLocationId());
		pstmt.setString(2, location.getLocationTime());
		pstmt.setString(3, location.getLocationCoordinate());

		int result = pstmt.executeUpdate();

		if (result == 1) {
			logger.info(String.format("Add Complete %s : %s, %s, %s",
					tableName, location.getLocationId(),
					location.getLocationTime(),
					location.getLocationCoordinate()));
		} else {
			logger.info("Add Fail " + tableName);
			pstmt.close();
			conn.close();
			return false;
		}

		pstmt.close();
		conn.close();
		return true;
	}

	public Location selectById(String phoneNum) throws SQLException {
		conn = connector.getMysqlConnection();
		
		String sql = "select * from Location where USER_user_phone = ? order by location_time desc";
		PreparedStatement pstmt = conn.prepareStatement(sql);
		pstmt.setString(1, phoneNum);
		ResultSet rs = pstmt.executeQuery();

		if (rs.next()) {
			Location location = new Location(rs.getString("USER_user_phone"),
									rs.getString("location_time"),
									rs.getString("location_coordinate"));
			pstmt.close();
			rs.close();
			conn.close();
			return location;
		}

		pstmt.close();
		rs.close();
		conn.close();
		return null;

	}
}
