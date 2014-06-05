package database;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import logger.SagimaraLogger;

import org.apache.log4j.Logger;

import dto.Verification;
import dto.Video;

public class VideoDAO {
	private Connection conn;
	private DatabaseConnector connector;
	private Logger logger = SagimaraLogger.logger;
	
	public VideoDAO() {
		this.connector = new DatabaseConnector();
		this.conn = connector.getMysqlConnection();
	}

	public boolean add(Video video) throws SQLException {
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
			pstmt.close();
			conn.close();
			return false;
		}

		pstmt.close();
		conn.close();
		return true;
	}

	public Video selectById(String phoneNum) throws SQLException {
		
		String sql = "select * from VIDEO where USER_user_phone = ? order by video_date desc";
		PreparedStatement pstmt = conn.prepareStatement(sql);
		pstmt.setString(1, phoneNum);
		ResultSet rs = pstmt.executeQuery();

		if (rs.next()) {
			Video video = new Video(rs.getString("USER_user_phone"),
									rs.getString("video_link"),
									rs.getString("video_date"));
			pstmt.close();
			rs.close();
			return video;
		}

		pstmt.close();
		rs.close();
		return null;
	}
}
