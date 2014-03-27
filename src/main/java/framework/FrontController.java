package framework;

import java.io.IOException;
import java.util.HashMap;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class FrontController extends HttpServlet {
	HashMap<String, String> map = new HashMap();

	@Override
	public void init() throws ServletException {
		super.init();
		map.put("sagimara2", "/index.jsp");
	}

	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {	
		String path = request.getContextPath();
		path = path.replaceFirst("/", "");
		System.out.println(path);
		String result = map.get(path);
		System.out.println(result);
		
		RequestDispatcher dispather = getServletContext().getRequestDispatcher(result);
		dispather.forward(request, response);
	}

}
