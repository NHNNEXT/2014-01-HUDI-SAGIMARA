package database;

import java.sql.Connection;
import javax.naming.Context;
import javax.naming.InitialContext;
import javax.sql.DataSource;
import logger.SagimaraLogger;
import org.apache.log4j.Logger;

public class DatabaseConnector {
	Logger logger;
	
	public DatabaseConnector() {
		logger = SagimaraLogger.logger;
	}
	
	public Connection getMysqlConnection() {

		try {
			Class.forName("com.mysql.jdbc.Driver");
			logger.info("jdbc loading");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
		try {
			Context initCtx = new InitialContext();
			Context envCtx = (Context) initCtx.lookup("java:comp/env");
			DataSource ds = (DataSource) envCtx.lookup("jdbc/DBCP");
			Connection conn = ds.getConnection();
			logger.info("mysql connected");
			return conn;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	public Connection getOracleConnection() {
		return null;
	}
	public Connection getMariaConnection() {
		return null;
	}
}
