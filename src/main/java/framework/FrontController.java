package framework;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import logger.SagimaraLogger;

import org.apache.log4j.Logger;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import controller.InsertLocationDataController;
import controller.RequestMapping;
import database.DatabaseHandler;

public class FrontController extends HttpServlet {

	private static final long serialVersionUID = 1L;
	
	
	static public HashMap<String, String> map = new HashMap<String, String>();
	DatabaseHandler db;
	JsonBuilder jb;
	Logger logger;
	RequestMapping rm;
	
	
	@Override
	public void init() throws ServletException {
		super.init();
		map.put("/test", "/test.jsp");
		map.put("/index", "/index.jsp");
		map.put("/admin/register", "/admin_register.jsp");
		map.put("/admin/login", "/admin_login.jsp");
		map.put("/insert/Photo","/insertPhoto.jsp");
		map.put("/insert/Location","/insertLocation.jsp");
		map.put("/insert/requestVerification", "/requestVerification");
		map.put("/main_test","/main_test.jsp");
		
		rm = new RequestMapping();
		db = new DatabaseHandler();
		jb = new JsonBuilder();
		logger = SagimaraLogger.logger;
	}

	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String path = request.getRequestURI();
		String result = map.get(path);
		response.setCharacterEncoding("utf8");
		request.setCharacterEncoding("utf8");
		
		logger.info("[DO GET] get Request URI : " + path);
		
		if(path.equals("/admin/register")){
			adminRegister(request, response);
		}
		if (result != null) {
			RequestDispatcher dispather = getServletContext()
					.getRequestDispatcher(result);
			dispather.forward(request, response);
		} else {
			requestPathError(request, response);
		}

	}

	private void requestPathError(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.setAttribute("error", "존재하지 않는 주소입니다");
		RequestDispatcher dispather = getServletContext()
				.getRequestDispatcher("/error.jsp");
		dispather.forward(request, response);
	}

	@Override
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		String path = request.getRequestURI();	
		RequestMapping rm = new RequestMapping();
		
		if(!path.isEmpty()){
			logger.info("[DO POST] post Request URI : " + path);
			rm.requestController(path).run(request, response);
		} else {
			requestPathError(request, response);
		}
		
	}

	private void adminRegister(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String path, result, id, password;
		path= request.getRequestURI();
		result = map.get(path);
		
		if (result != null) {
			String json = makeResultJSON(path, result);

			id = (String) request.getParameter("id");
			password = (String) request.getParameter("password");
			logger.info("[Admin Register] id : "+id + " , password : " + password);

			response.setCharacterEncoding("utf8");
			request.setCharacterEncoding("utf8");		
			request.setAttribute("json", json);

			RequestDispatcher dispather = getServletContext()
					.getRequestDispatcher(result);
			dispather.forward(request, response);
		}else{
			requestPathError(request, response);
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
