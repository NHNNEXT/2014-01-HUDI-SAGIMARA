package controller;

import java.util.HashMap;

public class RequestMapping {
	static public HashMap<String, Controller> map = new HashMap<String, Controller>()  {
		private static final long serialVersionUID = -3286315173722334990L;
	{
		put("/test", new UserViewController());
		put("/insert/PhotoData", new InsertPhotoDataController());
		put("/insert/Request", new InsertRequestDataController());
		put("/insert/Location", new InsertLocationDataController());
		put("/index", new ForwardController("/index.jsp"));
	}};
	
	public Controller requestController(String path) {
		return map.get(path);
	}

}
