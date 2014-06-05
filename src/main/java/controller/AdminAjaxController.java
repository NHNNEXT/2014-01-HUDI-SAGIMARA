package controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import logger.SagimaraLogger;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileItemFactory;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.log4j.Logger;

import utility.JsonBuilder;
import database.DatabaseHandler;
import dto.Inquiry;
import dto.Request;
import dto.UserInquiry;
import dto.UserProfile;
import dto.Verification;

public class AdminAjaxController implements Controller {
	private String forwardPath;
	private Logger logger;
	private DatabaseHandler dbh;
	private JsonBuilder jb;
	
	public AdminAjaxController(String forwardPath) {
		super();
		this.logger = SagimaraLogger.logger;
		this.dbh = DatabaseHandler.getDatabaseHandler();
		this.jb = JsonBuilder.getJsonBuilder();
		this.forwardPath = forwardPath;
	}

	@Override
	public String run(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		
//		HttpSession session =  request.getSession();
//
//		String id = (String)session.getAttribute("admin_id");  // request에서 id 파라미터를 가져온다
//
//		if(id==null||id.equals("")){                     // id가 Null 이거나 없을 경우
//			response.sendRedirect("/admin/login");    // 로그인 페이지로 리다이렉트 한다.
//			return null;
//		}
		
		Map<String, String> requestMap;
		
		requestMap = makeParameterMap(request);
		String json;
		
		if(requestMap.get("request").equals("visits")){
			UserInquiry visits = dbh.getVisiterDataAtToday();
			json = jb.objectToJson(visits);
			logger.info(json);
			request.setAttribute("visits", json);	
		}
		else if (requestMap.get("request").equals("notify")){
			UserInquiry noti = dbh.getNotificationAtToday();
			json = jb.objectToJson(noti);
			logger.info(json);
			request.setAttribute("notify", json);	
		}
		else if (requestMap.get("request").equals("verification")){
			ArrayList<Verification> veriList = dbh.getVerifivationList(Integer.parseInt(requestMap.get("count")));
			json = jb.objectToJson(veriList);
			logger.info(json);
			request.setAttribute("verification", json);
		}
		else if (requestMap.get("request").equals("request")){
			ArrayList<Request> requestList = dbh.getRequestList(Integer.parseInt(requestMap.get("count")));
			json = jb.objectToJson(requestList);
			logger.info(json);
			request.setAttribute("request", json);	
		}
		return forwardPath;
	}

	
	private Map<String, String> makeParameterMap(HttpServletRequest request) throws IOException {
		FileItemFactory factory = new DiskFileItemFactory();
		ServletFileUpload upload = new ServletFileUpload(factory);
		List<FileItem> items = null;
		Map<String, String> map = new HashMap<String, String>();
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
				map.put(name, value);
			} 
		} 
		return map;
	}
}
