package framework;

import java.util.HashMap;
import java.util.Map;

import logger.SagimaraLogger;

import org.apache.log4j.Logger;

import com.google.gson.Gson;

public class JsonBuilder {
	Gson gson = new Gson();
	Logger logger = SagimaraLogger.logger;
	
	public String objectToJson(Object o) {
		String result = gson.toJson(o);
		return result;
	}
	
	public String requestSuccessJSON() {
		Map<String, String> resultMap = new HashMap<String, String>();

		resultMap.put("code", "200");
		resultMap.put("message", "Request Success");

		return objectToJson(resultMap);
	}
}
