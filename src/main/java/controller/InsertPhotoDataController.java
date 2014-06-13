package controller;

import java.io.File;
import java.io.IOException;
import java.sql.SQLException;
import java.util.Date;
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
import database.VideoDAO;
import dto.Video;

public class InsertPhotoDataController implements Controller {
	private Logger logger;
	private JsonBuilder jb;
	private String photoImagePath;
	private String forwardPath;

	public InsertPhotoDataController(String forwardPath) {
		super();
		this.logger = SagimaraLogger.logger;
		this.jb = JsonBuilder.getJsonBuilder();
		this.forwardPath = forwardPath;

	}

	public String run(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String id = null;
		String videoLink = null;
		String date = null;
		String json = null;

		ServletContext context = request.getServletContext();
		String fullPath = context.getRealPath("/updatedImages/");
		//String fullPath = "/Users/josunghwan/Desktop";
		photoImagePath = fullPath;
		logger.info("Photo Image Full Path " + fullPath);
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

					if (name.equals("id")) {
						id = value;
					}
					if (name.equals("date")) {
						date = value;
					}

				} else {
					// Process uploaded file.
					Date curDate = new Date();
					videoLink = photoImagePath + "/" + id + "-"
							+ curDate.getTime() + "." + "jpg";
					logger.info("Photo Link :" + videoLink);
					try {
						File file = new File(videoLink);
						item.write(file);
					} catch (Exception e) {
						e.printStackTrace();
					}
				}
			}

			Video video = new Video(id, videoLink, date);
			VideoDAO videoDAO = new VideoDAO();

			try {
				if (videoDAO.selectById(id) == null) {
					if (videoDAO.add(video)) {
						json = jb.requestSuccessJSON();
					} else {
						json = jb.requestFailedJSON();
					}
				}else{
					if (videoDAO.update(video)) {
						json = jb.requestSuccessJSON();
					} else {
						json = jb.requestFailedJSON();
					}
				}

			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

		}

		request.setAttribute("json", json);

		return forwardPath;
	}
}
