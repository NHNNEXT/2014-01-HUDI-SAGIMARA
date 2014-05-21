package controller;

import java.util.HashMap;

public class RequestMapping {
	static public HashMap<String, Controller> map = new HashMap<String, Controller>()  {
		private static final long serialVersionUID = -3286315173722334990L;
	{
		put("/test", new UserViewController("/json.jsp"));
		put("/insert/photoData", new InsertPhotoDataController("/json.jsp"));
		put("/insert/Request", new InsertRequestDataController("/json.jsp"));
		put("/insert/locationData", new InsertLocationDataController("/json.jsp"));
		put("/admin/register", new AdminRegisterController("/json.jsp"));
		
		put("/", new ForwardController("/index.jsp"));
		put("/index", new ForwardController("/index.jsp"));
		put("/insert/photo",new ForwardController("/insertPhoto.jsp"));
		put("/insert/location", new ForwardController("/insertLocation.jsp"));
		put("/admin/login", new ForwardController("/admin_login.jsp"));
		put("/main_test", new ForwardController("/main_test.jsp"));
	}};
	
	public Controller requestController(String path) {
		return map.get(path);
	}
	
	public boolean isContain(String path) {
		return map.containsKey(path);	
	}

}
