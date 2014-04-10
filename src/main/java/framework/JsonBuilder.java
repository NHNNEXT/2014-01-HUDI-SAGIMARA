package framework;

import com.google.gson.Gson;

public class JsonBuilder {
	Gson gson = new Gson();
	
	public String javaToJson(Object o) {
		String result = gson.toJson(o);
		return result;
	}
}
