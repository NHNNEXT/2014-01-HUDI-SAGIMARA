package controller;

import java.io.File;
import java.io.IOException;
import java.util.Iterator;
import java.util.List;

import javax.servlet.ServletContext;
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

public class InsertPhotoDataController implements Controller {
	private Logger logger;
	private DatabaseHandler dbh;
	private JsonBuilder jb;
	private String photoImagePath;
	private String forwardPath;
	
	public InsertPhotoDataController(String forwardPath) {
		super();
		this.logger = SagimaraLogger.logger;
		this.dbh = DatabaseHandler.getDatabaseHandler();
		this.jb = JsonBuilder.getJsonBuilder();
		this.forwardPath = forwardPath;
		
	}
	
	public String run(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException{
		String id = null;
		String videoLink = null;
		String date = null;
		String json = null;
		
		ServletContext context = request.getServletContext();
		String fullPath = context.getRealPath("/updatedImages/");
		photoImagePath = fullPath;
		logger.info(fullPath);
		
		logger.info("InsertPhoto in");
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
			logger.info("InsertPhoto in in");
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
					logger.info("name : "+name);
				} else {
					// Process uploaded file.
					String name = item.getContentType();
					String[] array = name.split("/");
					videoLink = photoImagePath + id +"."+ array[1] ;
					try {
						File file = new File(videoLink);
						item.write(file);
					} catch (Exception e) {
						e.printStackTrace();
					}
				}
				
				if(id!=null && videoLink!=null && date!=null){
					if(dbh.insertPhoto(id, videoLink, date)){
						json = jb.requestSuccessJSON();
					}else{
						json = jb.requestFailedJSON();
					}
				}
			}
			
		}
		

		request.setAttribute("json", json);
				
		return forwardPath;
	}
}
