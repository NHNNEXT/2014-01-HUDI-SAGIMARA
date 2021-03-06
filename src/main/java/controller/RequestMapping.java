package controller;

import java.util.HashMap;

public class RequestMapping {
	static public HashMap<String, Controller> map = new HashMap<String, Controller>()  {
		private static final long serialVersionUID = -3286315173722334990L;
	{
		//POST
		put("/test", new UserViewController("/json.jsp"));
		put("/insert/photoData", new InsertPhotoDataController("/json.jsp"));
		put("/insert/RequestData", new InsertRequestDataController("/json.jsp"));
		put("/insert/locationData", new InsertLocationDataController("/json.jsp"));
		put("/admin/register", new AdminRegisterController("/json.jsp"));
		put("/admin/login_submit", new AdminLoginController("/json.jsp"));
		put("/push/alarm", new PushAlarmController("/json.jsp"));
		put("/admin/data", new AdminAjaxController("/json.jsp"));
		
		//GET
		put("/", new ForwardController("/index.jsp"));
		put("/index", new ForwardController("/index.jsp"));
		put("/insert/photo",new ForwardController("/insertPhoto.jsp"));
		put("/insert/request",new ForwardController("/insertRequest.jsp"));
		put("/insert/location", new ForwardController("/insertLocation.jsp"));
		put("/admin/login", new ForwardController("/admin_login.jsp"));
		put("/admin/index",new AdminIndexPageController("/admin_index.jsp"));
		put("/admin/userList", new AdminUserListController("/admin_userList.jsp"));
		put("/admin/verificationList", new AdminUserListController("/admin_verificationList.jsp"));
		
		//TEST
		put("/main_test", new ForwardController("/javascripts/test/main_test.jsp"));
	}};
	
	public Controller requestController(String path) {
		return map.get(path);
	}
	
	public boolean isContain(String path) {
		return map.containsKey(path);	
	}

}
