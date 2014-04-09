package framework;

import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.util.HashMap;

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
	DatabaseController dbc;
	JsonBuilder jb;

	@Override
	public void init() throws ServletException {
		super.init();
		map.put("/test", "/test.jsp");
		map.put("/", "/index.jsp");
		
		dbc = new DatabaseByMysql();
		jb = new JsonBuilder();
	}

	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {	

		String path = request.getServletPath();
		String result = map.get(path);
		
		if (result != null) {
			RequestDispatcher dispather = getServletContext().getRequestDispatcher(result);
			dispather.forward(request, response);
		} else {
			System.out.println("path error");
			System.out.println(path);
			System.out.println(result);
		}

		
	}

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String path = request.getServletPath();
		String result = map.get(path);
		String id = (String) request.getParameter("id");
		System.out.println(path);
		System.out.println(result);
		System.out.println(id);
		
		DatabaseUserTable dut = dbc.readtable("test", id);
		String json = jb.javaToJson(dut);
		System.out.println(json);
		response.setCharacterEncoding("utf8");
		request.setCharacterEncoding("utf8");
		
		request.setAttribute("json", json);
		
//		PrintWriter out = response.getWriter();
//		out.println(json);
		
		OutputStreamWriter writer = new OutputStreamWriter(response.getOutputStream(), "utf8");
		writer.write(json);
		writer.close();


//		if (result != null) {
//			RequestDispatcher dispather = getServletContext().getRequestDispatcher(result);
//			dispather.forward(request, response);
//		} else {
//			System.out.println("path error");
//			System.out.println(path);
//			System.out.println(result);
//		}

		//super.doPost(request, response);
	}

	@Override
	public void destroy() {
		// TODO Auto-generated method stub
		super.destroy();
	}
	
	
	
}
