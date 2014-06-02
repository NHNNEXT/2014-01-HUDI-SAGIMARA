package database;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import logger.SagimaraLogger;

import org.apache.log4j.Logger;

import dto.Video;

public class VideoDAO {
	private Connection conn;
	private Logger logger = SagimaraLogger.logger;

	public VideoDAO(Connection conn) {
		this.conn = conn;
	}

	public void add(Video video) throws SQLException {
		String tableName = video.getTableName();
		String sql = "INSERT INTO " + tableName
				+ "(USER_user_phone, video_link, video_date)"
				+ " VALUES (?, ?, ?)";

		PreparedStatement pstmt = conn.prepareStatement(sql);
		pstmt.setString(1, video.getVideoId());
		pstmt.setString(2, video.getVideoLink());
		pstmt.setString(3, video.getVideoDate());

		int result = pstmt.executeUpdate();

		if (result == 1) {
			logger.info(String.format("Add Complete %s : %s, %s, %s",
					tableName, video.getVideoId(),
					video.getVideoLink(),
					video.getVideoDate()));
		} else {
			logger.info("Add Fail " + tableName);
		}

		pstmt.close();
	}
}
