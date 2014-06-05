package controller;

import java.io.IOException;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import logger.SagimaraLogger;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileItemFactory;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.log4j.Logger;

import utility.JsonBuilder;
import database.AdminDAO;
import dto.Admin;

public class AdminRegisterController implements Controller {
	private Logger logger;
	private JsonBuilder jb;
	private String forwardPath;
	
	public AdminRegisterController(String forwardPath) {
		super();
		this.logger = SagimaraLogger.logger;
		this.jb = JsonBuilder.getJsonBuilder();
		this.forwardPath = forwardPath;
	}
	
	@Override
	public String run(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String id, password, email, name;
		String json=null;
		Map<String, String> requestMap;
		
		requestMap = makeParameterMap(request);
		id = requestMap.get("admin_id");
		password =  requestMap.get("admin_pw");
		email = requestMap.get("admin_email");
		name = requestMap.get("admin_name");
		
		switch (CheckForAdminRegister(id,password, email, name)) {
		case 0:
			json = jb.requestSuccessJSON();
			break;
		case 1:
			json = jb.requstErrorJSON();
			break;
		case 2:
			json = jb.requestFailedJSON();
			break;
		case -1:
			json = jb.requestFailedJSON();
			break;
		default:
			json = jb.requestFailedJSON();
			break;
		} 
		
		request.setAttribute("json", json);
		
		return forwardPath;
	}
	
	public int CheckForAdminRegister(String id, String password, String email, String name) {
		Admin admin = new Admin();
		Admin dbAdmin = new Admin();
		AdminDAO adminDAO = new AdminDAO();

		logger.info(String.format("CheckForAdminRegister %s, %s, %s, %s",
				id, password, email,
				name));
		admin.setAdminId(id);
		admin.setAdminPassword(password);
		admin.setAdminName(name);
		admin.setAdminEmail(email);
		admin.setAdminStatus("1");

		try {
			dbAdmin = adminDAO.selectById(id);
			
			if (dbAdmin == null) {
				adminDAO.add(admin);
				return 0;
			}  else {
				return 1;
			}

		} catch (SQLException e) {
			e.printStackTrace();
		}

		return -1;
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
