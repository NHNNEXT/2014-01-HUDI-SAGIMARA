package framework;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import logger.SagimaraLogger;
import model.UserProfile;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileItemFactory;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.log4j.Logger;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import database.DatabaseHandler;

public class FrontController extends HttpServlet {

	private static final long serialVersionUID = 1L;
	String photoImagePath ="/home/dev/photo/";
	
	HashMap<String, String> map = new HashMap<String, String>();
	DatabaseHandler db;
	JsonBuilder jb;
	Logger logger;
	
	
	@Override
	public void init() throws ServletException {
		super.init();
		map.put("/test", "/test.jsp");
		map.put("/index", "/index.jsp");
		map.put("/admin/register", "/admin_register.jsp");
		map.put("/admin/login", "/admin_login.jsp");
		map.put("/insert/Photo","/insertPhoto.jsp");
		
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
		
		//"/tesst" 유저 정보 가져오
		if (path.equals("/test")) {
			logger.info("[DO POST] post Request URI : " + path);
			test(request, response);
			
		//"/insertPhoto" 유저 사진 전송
		}else if(path.equals("/insert/PhotoData")){
			logger.info("[DO POST] post Request URI : " + path);
			insertPhoto(request, response);
			
		//"/insertLocation" 유저 위치정보 전송
		}else if(path.equals("/insertLocation")){
			logger.info("[DO POST] post Request URI : " + path);
			insertLocation(request, response);
			
		}else{
			requestPathError(request, response);
		}
		
	}
	
	
	private void insertLocation(HttpServletRequest request,
			HttpServletResponse response) {
		
		String phone = (String)request.getParameter("phone");
		String cordinate = (String)request.getParameter("location");
		String time = (String)request.getParameter("datetime");
		
		db.insertLocation(phone, cordinate, time);
		
	}

	private void insertPhoto(HttpServletRequest request,
			HttpServletResponse response) {
		String id = null;
		String videoLink = null;
		String date = null;
		
		boolean isMultipart = ServletFileUpload.isMultipartContent(request);
		if (isMultipart) {
			FileItemFactory factory = new DiskFileItemFactory();
			ServletFileUpload upload = new ServletFileUpload(factory);
			List<FileItem> items = null;
			try {
				items = upload.parseRequest(request);
			} catch (FileUploadException e) {
				e.printStackTrace();
			}


			Iterator<FileItem> ir = items.iterator();
			while (ir.hasNext()) {
				FileItem item = (FileItem) ir.next();
				if (item.isFormField()) {
					// Process form field.
					String name = item.getFieldName();
					String value = item.getString();
					
					if(name.equals("id")){
						id = value;
					}
					if(name.equals("date")){
						date = value;
					}
					
				} else {
					// Process uploaded file.
					String name = item.getContentType();
					String[] array = name.split("/");
					videoLink = photoImagePath + id + date +"."+ array[1] ;
					
					try {
						InputStream inputStream = item.getInputStream();
						OutputStream outputStream = new FileOutputStream(new File(videoLink));
					} catch (IOException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
				}
				
				if(id!=null && videoLink!=null&&date!=null){
					db.insertPhoto(id, videoLink, date);
				}
			}
			
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

	private void test(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String path = request.getServletPath();
		String result = map.get(path);
		String id = null;
		
		logger.info(request.getHeader("Content-type"));
		
		boolean isMultipart = ServletFileUpload.isMultipartContent(request);
		if (isMultipart) {
			FileItemFactory factory = new DiskFileItemFactory();
			ServletFileUpload upload = new ServletFileUpload(factory);
			List<FileItem> items = null;
			try {
				items = upload.parseRequest(request);
			} catch (FileUploadException e) {
				e.printStackTrace();
			}
			Iterator<FileItem> ir = items.iterator();
			while (ir.hasNext()) {
				FileItem item = (FileItem) ir.next();

				if (item.isFormField()) {
					// Process form field.
					String name = item.getFieldName();
					String value = item.getString();
					id = value;
					logger.info(name +" : "+ value);
				} else {
					// Process uploaded file.
					// String fieldName = item.getFieldName();
					// String fileName = item.getName();
					// String contentType = item.getContentType();
					// boolean isInMemory = item.isInMemory();
					// long sizeInBytes = item.getSize();
				}
			}

		} else {
			id = (String) request.getParameter("id");
		}

		logger.info(id);
		if (!id.isEmpty()) {
			UserProfile dut = db.readUserProfile(id);
			String json = jb.javaToJson(dut);
			logger.info(json);
			response.setCharacterEncoding("utf8");
			request.setCharacterEncoding("utf8");
			request.setAttribute("json", json);
		} else {
			logger.info("id is null");
		}

		if (!result.isEmpty()) {
			RequestDispatcher dispather = getServletContext()
					.getRequestDispatcher(result);
			dispather.forward(request, response);
		} else {
			logger.info("path error");
			logger.info(path);
			logger.info(result);
		}
	}
}
