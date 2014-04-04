package framework;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class FrontController extends HttpServlet {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	HashMap<String, String> map = new HashMap<String, String>();

	@Override
	public void init() throws ServletException {
		super.init();
		map.put("/test", "/test.jsp");
		map.put("/", "/index.jsp");
	}

	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {	

		String path = request.getServletPath();
		String result = map.get(path);
		
		try {
			Class.forName("com.mysql.jdbc.Driver");
		} catch (ClassNotFoundException e) {
			System.out.println("error!!");
			e.printStackTrace();
		}
		
		if (result != null) {
			RequestDispatcher dispather = getServletContext().getRequestDispatcher(result);
			dispather.forward(request, response);
		} else {
			PrintWriter out = response.getWriter();
			out.println("path error");
			out.println(path);
			out.println(result);
			
			out.flush();
			out.close();
		}

		
		
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// TODO Auto-generated method stub
		super.doPost(req, resp);
	}

	@Override
	public void destroy() {
		// TODO Auto-generated method stub
		super.destroy();
	}
	
	
	
}
