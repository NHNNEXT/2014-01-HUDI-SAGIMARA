package controller;

import java.io.IOException;
import java.sql.SQLException;
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
import database.InquiryDAO;
import database.LocationDAO;
import database.NotificationDAO;
import database.RequestDAO;
import database.UserDAO;
import database.VerificationDAO;
import database.VideoDAO;
import dto.Location;
import dto.Notification;
import dto.Request;
import dto.RequestList;
import dto.VerificationListForVerify;
import dto.UserForAdmin;
import dto.UserInquiry;
import dto.Verification;
import dto.VerifivationList;
import dto.Video;

public class AdminAjaxController implements Controller {
	private String forwardPath;
	private Logger logger;
	private JsonBuilder jb;
	
	public AdminAjaxController(String forwardPath) {
		super();
		this.logger = SagimaraLogger.logger;
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
			UserInquiry visits = getVisiterDataAtToday();
			json = jb.objectToJson(visits);
			logger.info(json);
			request.setAttribute("json", json);	
		}
		else if (requestMap.get("request").equals("notify")){
			UserInquiry noti = getNotificationAtToday();
			json = jb.objectToJson(noti);
			logger.info(json);
			request.setAttribute("json", json);	
		}
		else if (requestMap.get("request").equals("verification")){
			ArrayList<VerifivationList> VerificationResult = makeVerificationData(Integer.parseInt(requestMap.get("count")));
			json = jb.objectToJson(VerificationResult);
			logger.info(json);
			request.setAttribute("json", json);
		}
		else if (requestMap.get("request").equals("request")){
			ArrayList<RequestList> requestList = getRequestList(Integer.parseInt(requestMap.get("count")));
			json = jb.objectToJson(requestList);
			logger.info(json);
			request.setAttribute("json", json);	
		}else if (requestMap.get("request").equals("notification")){
			ArrayList<Notification> notiList = getNotificationList(Integer.parseInt(requestMap.get("count")));
			json = jb.objectToJson(notiList);
			logger.info(json);
			request.setAttribute("json", json);	
		} else if (requestMap.get("request").equals("userList")) {
			
			int maxRow = Integer.parseInt(requestMap.get("max"));
			int pageNumber = Integer.parseInt(requestMap.get("page"));
			String condition = requestMap.get("orderBy");
			if(condition.equals("")||condition==null){
				condition = "'verification_time'";
			}
			
			ArrayList<UserForAdmin> userList = readUserListForAdminPage(maxRow, pageNumber, condition);
			json = jb.objectToJson(userList);
			logger.info(json);
			request.setAttribute("json", json);
		} else if (requestMap.get("request").equals("verificationList")) {
			int maxRow = Integer.parseInt(requestMap.get("max"));
			int pageNumber = Integer.parseInt(requestMap.get("page"));
			String condition = requestMap.get("orderBy");
			if(condition.equals("")||condition==null){
				condition = "'verification_time'";
			}
			ArrayList<VerificationListForVerify> requestList = selectRequestListForVerification(maxRow, pageNumber, condition);
			json = jb.objectToJson(requestList);
			logger.info(json);
			request.setAttribute("json", json);
		} else if (requestMap.get("request").equals("verificationStatusChange")) {
			int status = Integer.parseInt(requestMap.get("status"));
			String id = requestMap.get("id");
			
			if (usetStatusChange(id,status)) {
				json = jb.requestSuccessJSON();
			} else {
				json = jb.requestFailedJSON();
			}
			
			logger.info(json);
			request.setAttribute("json", json);
		}
		
		
		
		
		return forwardPath;
	}




	private boolean usetStatusChange(String id, int status) {
		UserDAO userDAO = new UserDAO();
		 try {
			if(userDAO.updateStatus(id, status)==1){
				 return true;
			 }
		} catch (SQLException e) {
			logger.info("User update Fail");
			e.printStackTrace();
		};
		return false;
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
	

	private ArrayList<VerifivationList> makeVerificationData(int count) {
		ArrayList<Verification> veriList = selectVerifivationList(count);

		ArrayList<VerifivationList> result = new ArrayList<VerifivationList>();

		for (int i=0; i<veriList.size(); i++){
			Verification veri = veriList.get(i);
			String phoneNum = veri.getVerificationId();
			Video video = getVideoById(phoneNum);
			Location location = getLocationById(phoneNum);

			if(video!=null&&location!=null){
				VerifivationList list = new VerifivationList(phoneNum,
						veri.getVerificationTime(),
						veri.getVerificationStatus(),
						video.getVideoLink(),
						video.getVideoDate(),
						location.getLocationCoordinate(),
						location.getLocationTime());
				result.add(list);
			}else{
				VerifivationList list = new VerifivationList(phoneNum,
						veri.getVerificationTime(),
						veri.getVerificationStatus());
				if(video!=null){
					list.setVideoLink(video.getVideoLink());
					list.setVideoDate(video.getVideoDate());
				}else{
					list.setVideoLink("");
					list.setVideoDate("");
				}
				if(location!=null){
					list.setLocationCoordinate(location.getLocationCoordinate());
					list.setLocationTime(location.getLocationTime());
				}else{
					list.setLocationCoordinate("");
					list.setLocationTime("");
				}
				result.add(list);
			}
		}

		return result;
	}

	private Location getLocationById(String phoneNum) {
		LocationDAO locationDAO = new LocationDAO();

		try {
			return locationDAO.selectById(phoneNum);
		} catch (SQLException e) {
			e.printStackTrace();
			logger.info("Inquiry select Fail");
		}
		return null;
	}

	private Video getVideoById(String phoneNum) {
		VideoDAO videoDAO = new VideoDAO();

		try {
			return videoDAO.selectById(phoneNum);
		} catch (SQLException e) {
			e.printStackTrace();
			logger.info("Inquiry select Fail");
		}
		return null;
	}

	public UserInquiry getVisiterDataAtToday() {

		InquiryDAO inquiryDAO = new InquiryDAO();

		try {
			return inquiryDAO.selectForGraph();
		} catch (SQLException e) {
			e.printStackTrace();
			logger.info("Inquiry select Fail");
		}
		return null;
	}

	public UserInquiry getNotificationAtToday() {
		NotificationDAO notiDao = new NotificationDAO();

		try {
			return notiDao.selectForGraph();
		} catch (SQLException e) {
			e.printStackTrace();
			logger.info("Notify select Fail");
		} 
		return null;
	}

	public ArrayList<Verification> selectVerifivationList(int count) {
		VerificationDAO veriDao = new VerificationDAO();

		try {
			return veriDao.getList(count);
		} catch (SQLException e) {
			e.printStackTrace();
			logger.info("Verifivation select Fail");
		} 
		return null;
	}

	public ArrayList<RequestList> getRequestList(int count) {
		RequestDAO reqDao = new RequestDAO();

		try {
			return reqDao.getList(count);
		} catch (SQLException e) {
			e.printStackTrace();
			logger.info("Request select Fail");
		}
		return null;
	}
	
	
	private ArrayList<Notification> getNotificationList(int count) {
		NotificationDAO notiDAO = new NotificationDAO();
		
		try {
			return notiDAO.getList(count);
		} catch (SQLException e) {
			e.printStackTrace();
			logger.info("Notification select Fail");
		}
		return null;
	}
	
	private ArrayList<UserForAdmin> readUserListForAdminPage(int maxRow, int pageNum, String condition) {
		
		try {
			UserDAO userDAO = new UserDAO();
			return userDAO.selectForAdminOrderBy(maxRow, pageNum, condition);
		} catch (SQLException e) {
			e.printStackTrace();
		}

		return null;
	}
	
	private ArrayList<VerificationListForVerify> selectRequestListForVerification(
			int maxRow, int pageNum, String condition) {
		try {
			VerificationDAO verificationDAO = new VerificationDAO();
			return verificationDAO.selectForAdminOrderBy(maxRow, pageNum, condition);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return null;
	}
}
