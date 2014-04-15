package _test;

import org.junit.Test;

import type.UserProfile;
import database.DatabaseByMysql;
import database.DatabaseController;
import framework.JsonBuilder;

public class DBTest {
	
	@Test
	public void testName() throws Exception {
		DatabaseController bdc = new DatabaseByMysql();
		UserProfile userProfile = new UserProfile();
		JsonBuilder jb = new JsonBuilder();
		userProfile = bdc.readtable("USER_PROFILE", "01048077749");
		System.out.println(bdc.getColumns("USER_PROFILE"));
		System.out.println(jb.javaToJson(userProfile));
	}
	
}
