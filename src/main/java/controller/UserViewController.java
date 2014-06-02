package controller;

import java.io.IOException;
import java.util.Iterator;
import java.util.List;

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
import database.DatabaseHandler;
import dto.UserProfile;

public class UserViewController implements Controller{

	private Logger logger;
	private DatabaseHandler dbh;
	private JsonBuilder jb;
	private String forwardPath;
	
	public UserViewController(String forwardPath) {
		super();
		this.logger = SagimaraLogger.logger;
		this.dbh = DatabaseHandler.getDatabaseHandler();
		this.jb = JsonBuilder.getJsonBuilder();
		this.forwardPath = forwardPath;

	}
	
	public String run(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException{
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
			UserProfile dut = dbh.readUserProfile(id);
			String json = jb.objectToJson(dut);
			logger.info(json);
			request.setAttribute("json", json);
		} else {
			logger.info("id is null");
		}

		return forwardPath;
	}
}
