package utility;

import java.util.HashMap;
import java.util.Map;

import com.google.gson.Gson;

public class JsonBuilder {
	private Gson gson = new Gson();
	private static JsonBuilder instance = new JsonBuilder();
	
	private JsonBuilder() {}
	
	public static JsonBuilder getJsonBuilder() {
		return instance;
	}
	
	public String objectToJson(Object o) {
		String result = gson.toJson(o);
		return result;
	}
	
	public String requestSuccessJSON() {
		Map<String, String> resultMap = new HashMap<String, String>();

		resultMap.put("code", "200");
		resultMap.put("message", "Success");
		return objectToJson(resultMap);
	}

	public String requestFailedJSON() {
		Map<String, String> resultMap = new HashMap<String, String>();

		resultMap.put("code", "400");
		resultMap.put("message", "Failed");
		return objectToJson(resultMap);
	}

	public String requstErrorJSON() {
		Map<String, String> resultMap = new HashMap<String, String>();

		resultMap.put("code", "204");
		resultMap.put("message", "No Content");
		return objectToJson(resultMap);
	}
}
