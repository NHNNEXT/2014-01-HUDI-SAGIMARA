package controller;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import logger.SagimaraLogger;

import org.apache.log4j.Logger;

import database.DatabaseHandler;
import framework.JsonBuilder;

public class InsertLocationDataController implements Controller {
	Logger logger;
	DatabaseHandler db;
	JsonBuilder jb;

	public InsertLocationDataController() {
		super();
		this.logger = SagimaraLogger.logger;
		this.db = new DatabaseHandler();
		this.jb = new JsonBuilder();

	}

	/* (non-Javadoc)
	 * @see controller.Controller#run()
	 */
	@Override
	public void run(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		String phone = (String) request.getParameter("id");
		String time = (String) request.getParameter("date");
		String cordinate = (String) request.getParameter("location");

		db.insertLocation(phone, time, cordinate);

	}
}
