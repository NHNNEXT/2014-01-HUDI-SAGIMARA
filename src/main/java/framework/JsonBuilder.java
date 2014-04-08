package framework;

import com.google.gson.Gson;

public class JsonBuilder {
	Gson gson = new Gson();
	
	public String javaToJson(DatabaseUserTable table) {
		String result = gson.toJson(table);
		return result;
	}
}
