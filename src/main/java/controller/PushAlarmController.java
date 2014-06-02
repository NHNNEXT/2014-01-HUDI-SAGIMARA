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

public class PushAlarmController implements Controller {
	private Logger logger;
	private DatabaseHandler dbh;
	private String forwardPath;

	public PushAlarmController(String forwardPath) {
		super();
		this.logger = SagimaraLogger.logger;
		this.dbh = DatabaseHandler.getDatabaseHandler();;
		this.forwardPath = forwardPath;
	}

	@Override
	public String run(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String userPhone = (String) request.getParameter("userPhone");
		Gson gson = new Gson();
		logger.info("[PushAlarmController Register] userPhone : " + userPhone);
		ArrayList<Request> resultList;
		
		resultList = dbh.getRequestsWithVerificationTime(userPhone);
		
		for(Request r : resultList){
			logger.info("HI : " +r.getRequestTo() + " : " + r.getRequestFrom() + " : " + r.getRequestDate());
		}
		
		String json = gson.toJson(resultList);
		request.setAttribute("json", json);
		
		return forwardPath;
	}

}
