package framework;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import logger.SagimaraLogger;

import org.apache.log4j.Logger;

import controller.Controller;
import controller.RequestMapping;

public class FrontController extends HttpServlet {
	private static final long serialVersionUID = 176019470968814358L;
	private Logger logger;
	private RequestMapping rm;

	@Override
	public void init() throws ServletException {
		super.init();
		rm = new RequestMapping();
		logger = SagimaraLogger.logger;
	}

	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		doPost(request, response);
	}

	@Override
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		String path = request.getRequestURI();
		logger.info(String.format("[DO %s] Request URI : %s",
				request.getMethod(), path));

		Controller controller = rm.requestController(path);
		if (controller == null) {
			requestPathError(request, response);
		}

		String forwardPath = controller.run(request, response);
		if (forwardPath != null) {
			if (forwardPath.startsWith("redirect:")) {
				forwardPath = forwardPath.replaceAll("redirect:", "");
				logger.info(String.format("REDIRECT : %s", forwardPath));
				response.sendRedirect(forwardPath);
			}
			
			logger.info(String.format("FORWARD : %s", forwardPath));
			forward(request, response, forwardPath);		
		}
	}

	private void forward(HttpServletRequest request, HttpServletResponse response, String forwardPath)
	        throws ServletException, IOException {
	    RequestDispatcher dispather = request.getServletContext()
	            .getRequestDispatcher(forwardPath);
	    dispather.forward(request, response);
	}
	
	private void requestPathError(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		logger.info("URLPath is error");
		request.setAttribute("error", "존재하지 않는 주소입니다");
		forward(request, response, "/error.jsp");

	}
}
