package framework;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import logger.SagimaraLogger;

import org.apache.log4j.Logger;

import controller.RequestMapping;
import database.DatabaseHandler;

public class FrontController extends HttpServlet {
	private static final long serialVersionUID = 176019470968814358L;
	DatabaseHandler db;
	JsonBuilder jb;
	Logger logger;
	RequestMapping rm;
	
	
	@Override
	public void init() throws ServletException {
		super.init();	
		rm = new RequestMapping();
		db = new DatabaseHandler();
		jb = new JsonBuilder();
		logger = SagimaraLogger.logger;
	}

	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String path = request.getRequestURI();
		String forwardPath = null;
	
		if(rm.isContain(path)){
			logger.info("[DO GET] get Request URI : " + path);
			forwardPath = rm.requestController(path).run(request, response);
		} else {
			requestPathError(request, response);
		}
		
		if (!forwardPath.isEmpty()) {
			RequestDispatcher dispather = request.getServletContext()
					.getRequestDispatcher(forwardPath);
			dispather.forward(request, response);
		} else {
			logger.info("forwardPath is null");
		}
	}

	@Override
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		String path = request.getRequestURI();	
		String forwardPath = null;
		RequestMapping rm = new RequestMapping();
		
		if(rm.isContain(path)){
			logger.info("[DO POST] post Request URI : " + path);
			forwardPath = rm.requestController(path).run(request, response);
		} else {
			requestPathError(request, response);
		}
		
		if (!forwardPath.isEmpty()) {
			RequestDispatcher dispather = request.getServletContext()
					.getRequestDispatcher(forwardPath);
			dispather.forward(request, response);
		} else {
			logger.info("forwardPath is null");
		}
		
	}
	
	private void requestPathError(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		logger.info("URLPath is error");
		request.setAttribute("error", "존재하지 않는 주소입니다");
		RequestDispatcher dispather = getServletContext()
				.getRequestDispatcher("/error.jsp");
		dispather.forward(request, response);

	}
}
