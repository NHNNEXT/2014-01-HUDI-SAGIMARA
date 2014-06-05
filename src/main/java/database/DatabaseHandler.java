package database;

import java.sql.Connection;

import logger.SagimaraLogger;

import org.apache.log4j.Logger;

public class DatabaseHandler {
	private Logger logger = SagimaraLogger.logger;
	private static DatabaseHandler instance = new DatabaseHandler();

	private DatabaseHandler() {}
	
	public static DatabaseHandler getDatabaseHandler() {
		return instance;
	}

	private Connection connect() {
		DatabaseConnector connector = new DatabaseConnector();

		Connection conn = connector.getMysqlConnection();

		if (conn == null) {
			logger.error("Database Connection Error");
		}
		return conn;
	}

}
