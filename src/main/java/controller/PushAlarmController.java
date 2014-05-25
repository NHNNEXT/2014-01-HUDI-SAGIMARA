package controller;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import logger.SagimaraLogger;

import org.apache.log4j.Logger;

import com.google.gson.Gson;

import database.DatabaseHandler;
import dto.Request;
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
		Gson gson = new Gson();
		logger.info("[PushAlarmController Register] userPhone : " + userPhone);
		ArrayList<Request> resultList;
		
		resultList = db.getRequestsWithVerificationTime(userPhone);
		
		for(Request r : resultList){
			logger.info("HI : " +r.getRequestTo() + " : " + r.getRequestFrom() + " : " + r.getRequestDate());
		}
		
		String json = gson.toJson(resultList);
		request.setAttribute("json", json);
		
		return forwardPath;
	}

}
