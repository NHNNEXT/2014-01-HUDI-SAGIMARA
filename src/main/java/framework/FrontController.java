package framework;

import java.io.IOException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
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
import database.DatabaseHandler;

public class FrontController extends HttpServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	HashMap<String, String> map = new HashMap<String, String>();
	//DatabaseController dbc;
	DatabaseHandler db;
	JsonBuilder jb;
	Logger logger;
	
	@Override
	public void init() throws ServletException {
		super.init();
		map.put("/test", "/test.jsp");
		map.put("/index", "/index.jsp");
		
		//dbc = new DatabaseByMysql();
		db = new DatabaseHandler();
		
		jb = new JsonBuilder();
		
		logger = SagimaraLogger.logger;
	}

	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String path = request.getServletPath();
		String result = map.get(path);
		response.setCharacterEncoding("utf8");
		request.setCharacterEncoding("utf8");

		if (result != null) {
			RequestDispatcher dispather = getServletContext()
					.getRequestDispatcher(result);
			dispather.forward(request, response);
		} else {
			request.setAttribute("error", "존재하지 않는 주소입니다");
			RequestDispatcher dispather = getServletContext()
					.getRequestDispatcher("/error.jsp");
			dispather.forward(request, response);
		}

	}

	@Override
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		//super.doPost(request, response);
		String path = request.getServletPath();

		if (path.equals("/test")) {
			test(request, response);
		}
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
				// TODO Auto-generated catch block
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

		/*
		 * 
		 * Id 값을 기반으로 User 불러오는 코드 // 있으면 가져오고 없으면 생성 코드.
		 * 받아온 User로 User.id를 통해 Inquiry(user) 생성
		 * Inquiry User DB에 삽입
		 */
		
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
