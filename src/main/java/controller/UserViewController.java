package controller;

import java.io.IOException;
import java.util.Iterator;
import java.util.List;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
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
import framework.FrontController;
import framework.JsonBuilder;

public class UserViewController implements Controller{

	Logger logger;
	DatabaseHandler db;
	JsonBuilder jb;
	
	public UserViewController() {
		super();
		this.logger = SagimaraLogger.logger;
		this.db = new DatabaseHandler();
		this.jb = new JsonBuilder();

	}
	
	public void run(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException{
		String path = request.getServletPath();
		String result = FrontController.map.get(path);
		String id = null;
		
		logger.info("Content-type : " + request.getHeader("Content-type"));
		
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
			RequestDispatcher dispather = request.getServletContext()
					.getRequestDispatcher(result);
			dispather.forward(request, response);
		} else {
			logger.info("path error");
			logger.info(path);
			logger.info(result);
		}
	}
}
