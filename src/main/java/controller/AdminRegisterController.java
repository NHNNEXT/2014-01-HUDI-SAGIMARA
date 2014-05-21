package controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import logger.SagimaraLogger;

import org.apache.log4j.Logger;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import database.DatabaseHandler;
import framework.FrontController;
import framework.JsonBuilder;

public class AdminRegisterController implements Controller {
	Logger logger;
	DatabaseHandler db;
	JsonBuilder jb;
	String forwardPath;

	public AdminRegisterController(String forwardPath) {
		super();
		this.logger = SagimaraLogger.logger;
		this.db = new DatabaseHandler();
		this.jb = new JsonBuilder();
		this.forwardPath = forwardPath;
	}
	
	@Override
	public void run(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String path, id, password;
		path= request.getRequestURI();
		
		if (forwardPath != null) {
			String json = makeResultJSON(path, forwardPath);

			id = (String) request.getParameter("id");
			password = (String) request.getParameter("password");
			logger.info("[Admin Register] id : "+id + " , password : " + password);

			response.setCharacterEncoding("utf8");
			request.setCharacterEncoding("utf8");		
			request.setAttribute("json", json);

			RequestDispatcher dispather = request.getServletContext()
					.getRequestDispatcher(forwardPath);
			dispather.forward(request, response);
		} else {
			logger.info("forwardPath is null");
		}
	}

	private String makeResultJSON(String path, String result) {
		Map<String, String> resultMap = new HashMap<String, String>();
		logger.info("[Requst] path : "+path + " result : "+ result);

		resultMap.put("code", "200");
		resultMap.put("message", "Request Success");

		Gson gson = new GsonBuilder().create();
		return gson.toJson(resultMap);
	}
}
