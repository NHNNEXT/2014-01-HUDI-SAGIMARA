package controller;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import logger.SagimaraLogger;

import org.apache.log4j.Logger;

import utility.JsonBuilder;

public class AdminRegisterController implements Controller {
	private Logger logger;
	private JsonBuilder jb;
	private String forwardPath;

	public AdminRegisterController(String forwardPath) {
		super();
		this.logger = SagimaraLogger.logger;
		this.jb = new JsonBuilder();
		this.forwardPath = forwardPath;
	}
	
	@Override
	public String run(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String id, password;

		id = (String) request.getParameter("id");
		password = (String) request.getParameter("password");
		logger.info("[Admin Register] id : "+id + " , password : " + password);
		
		String json = jb.requestSuccessJSON();
		request.setAttribute("json", json);

		return forwardPath;
	}
}
