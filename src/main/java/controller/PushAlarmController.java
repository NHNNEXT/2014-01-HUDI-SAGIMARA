package controller;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import logger.SagimaraLogger;

import org.apache.log4j.Logger;

import database.DatabaseHandler;
import database.VerificationDAO;
import framework.JsonBuilder;

public class PushAlarmController implements Controller {
	Logger logger;
	DatabaseHandler db;
	JsonBuilder jb;
	String forwardPath;

	public PushAlarmController(String forwardPath) {
		super();
		this.logger = SagimaraLogger.logger;
		this.db = new DatabaseHandler();
		this.jb = new JsonBuilder();
		this.forwardPath = forwardPath;
	}

	@Override
	public String run(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String userPhone = (String) request.getParameter("userPhone");
		// String dateTime = (String) request.getParameter("time");

		//DatabaseManager에 아래의 로직 추가
		//1.번호를 받아서.
		logger.info("[PushAlarmController Register] userPhone : " + userPhone);
		
		  
		//2. Verification의 가장 마지막 시간을 구하고
		/*
		 * 구현해야할것이 많음
		 */
		
		//3. Request 리스트를 리턴해줌
		String json;
		json = jb.requestSuccessJSON();

		request.setAttribute("json", json);
		return forwardPath;
	}

}
