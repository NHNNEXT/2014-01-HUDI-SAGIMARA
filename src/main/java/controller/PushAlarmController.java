package controller;

import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import logger.SagimaraLogger;

import org.apache.log4j.Logger;

import com.google.gson.Gson;

import database.RequestDAO;
import database.VerificationDAO;
import dto.Request;
import dto.Verification;

public class PushAlarmController implements Controller {
	private Logger logger;
	private String forwardPath;

	public PushAlarmController(String forwardPath) {
		super();
		this.logger = SagimaraLogger.logger;
		this.forwardPath = forwardPath;
	}

	@Override
	public String run(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String userPhone = (String) request.getParameter("userPhone");
		Gson gson = new Gson();
		logger.info("[PushAlarmController Register] userPhone : " + userPhone);
		ArrayList<Request> resultList;
		
		resultList = getRequestsWithVerificationTime(userPhone);
		
		for(Request r : resultList){
			logger.info("HI : " +r.getRequestTo() + " : " + r.getRequestFrom() + " : " + r.getRequestDate());
		}
		
		String json = gson.toJson(resultList);
		request.setAttribute("json", json);
		
		return forwardPath;
	}
	
	public ArrayList<Request> getRequestsWithVerificationTime(String phoneNumber) {
		VerificationDAO verificationDAO = new VerificationDAO();
		Verification verification;
		String verificationLatestTime;
		ArrayList<Request> resultList;
		try {
			verification = verificationDAO.selectById(phoneNumber);

			if (verification != null) {
				verificationLatestTime = verification.getVerificationTime();
				resultList = new RequestDAO()
						.selectByToPhoneNumberAndLatestDate(phoneNumber,
								verificationLatestTime);
				return resultList;
			} else {
				// 2014가 의미하는 것은 verification이 없을 경우에 모든 Request의 목록을 구해와야 하기 때문
				verificationLatestTime = "2014";
				resultList = new RequestDAO()
						.selectByToPhoneNumberAndLatestDate(phoneNumber,
								verificationLatestTime);
				return resultList;
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} 

		return null;
	}

}
