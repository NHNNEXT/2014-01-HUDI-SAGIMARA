package controller;

import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import logger.SagimaraLogger;

import org.apache.log4j.Logger;

import database.UserDAO;
import dto.UserForAdmin;
import dto.UserProfile;
import utility.JsonBuilder;

public class AdminUserListController implements Controller {
	private Logger logger;
	private JsonBuilder jb;
	private String forwardPath;
	
	public AdminUserListController(String forwardPath) {
		super();
		this.logger = SagimaraLogger.logger;
		this.jb = JsonBuilder.getJsonBuilder();
		this.forwardPath = forwardPath;
	}
	@Override
	public String run(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		HttpSession session =  request.getSession();

		String id = (String)session.getAttribute("admin_id");  // request에서 id 파라미터를 가져온다

		if(id==null||id.equals("")){                     // id가 Null 이거나 없을 경우
			response.sendRedirect("/admin/login");    // 로그인 페이지로 리다이렉트 한다.
			return null;
		}
		
		ArrayList<UserForAdmin> userList = readUserListForAdminPage(10,0);
		String json = jb.objectToJson(userList);
		logger.info(json);
		request.setAttribute("json", json);
		
		return forwardPath;
	}
	
	private ArrayList<UserForAdmin> readUserListForAdminPage(int maxRow, int pageNum) {
		
		try {
			UserDAO userDAO = new UserDAO();
			return userDAO.selectForAdminOrderBy(maxRow, pageNum,"'verification_time'");
		} catch (SQLException e) {
			e.printStackTrace();
		}

		return null;
	}

}
