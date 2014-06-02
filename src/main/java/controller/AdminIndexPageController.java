package controller;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

public class AdminIndexPageController implements Controller {
	private String forwardPath;
	
	public AdminIndexPageController(String forwardPath) {
		super();
		this.forwardPath = forwardPath;

	}
	@Override
	public String run(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		
		HttpSession session =  request.getSession();

		String id = (String)session.getAttribute("admin_id");  // request에서 id 파라미터를 가져온다

		if(id==null||id.equals("")){                     // id가 Null 이거나 없을 경우
			logger.info("rerererererer");
			response.sendRedirect("/admin/login");    // 로그인 페이지로 리다이렉트 한다.
			return null;
		}

		
		
		return forwardPath;
	}

}
