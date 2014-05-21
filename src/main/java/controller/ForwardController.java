package controller;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class ForwardController implements Controller{
	String forwardPath;
	
	public ForwardController(String forwardPath) {
		this.forwardPath = forwardPath;
	}

	@Override
	public void run(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		if (forwardPath != null) {
			RequestDispatcher dispather = request.getServletContext()
					.getRequestDispatcher(forwardPath);
			dispather.forward(request, response);
		}
	}

}
