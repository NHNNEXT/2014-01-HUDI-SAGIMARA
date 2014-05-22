package controller;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import logger.SagimaraLogger;

import org.apache.log4j.Logger;

import database.DatabaseHandler;
import framework.JsonBuilder;

public class AdminLoginController implements Controller {
	Logger logger;
	DatabaseHandler db;
	JsonBuilder jb;
	String forwardPath;

	public AdminLoginController(String forwardPath) {
		super();
		this.logger = SagimaraLogger.logger;
		this.db = new DatabaseHandler();
		this.jb = new JsonBuilder();
		this.forwardPath = forwardPath;
	}
	
	@Override
	public String run(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String id, password;
		String json=null;
		
		id = (String) request.getParameter("admin_id");
		password = (String) request.getParameter("admin_pw");

		switch (db.CheckForadminLogin(id,password)) {
		case 0:
			json = jb.requestSuccessJSON();
			break;
		case 1:
			json = jb.requstErrorJSON();
			break;
		case 2:
		case -1:
		default:
			json = jb.requestFailedJSON();
			break;
		} 
		

		request.setAttribute("json", json);

		return forwardPath;
	}
	

}
