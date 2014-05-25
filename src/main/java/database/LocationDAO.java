package database;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import logger.SagimaraLogger;

import org.apache.log4j.Logger;

import dto.Location;

public class LocationDAO {
	private Connection conn;
	Logger logger = SagimaraLogger.logger;

	public LocationDAO(Connection conn) {
		this.conn = conn;
	}

	public void add(Location location) throws SQLException {
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
			logger.info("Add Complete " + tableName + " : "
					+ location.getLocationId() + ","
					+ location.getLocationTime() + ","
					+ location.getLocationCoordinate());
		} else {
			logger.info("Add Fail " + tableName);
		}

		pstmt.close();
	}
}
