package framework;

import com.google.gson.Gson;

import database.Table;

public class JsonBuilder {
	Gson gson = new Gson();
	
	public String javaToJson(Table dut) {
		String result = gson.toJson(dut);
		return result;
	}
}
