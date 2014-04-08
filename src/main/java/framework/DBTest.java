package framework;

import junit.framework.TestCase;

public class DBTest extends TestCase {

	public void testdbread() throws Exception {
		DatabaseController dbc = new DatabaseByMysql();
		DatabaseUserTable dut = dbc.readtable("test", "testid2");
		assertEquals("testname2", dut.getName());
		assertEquals("testid2", dut.getId());
	}
	
	public void testjson() throws Exception {
		DatabaseController dbc = new DatabaseByMysql();
		DatabaseUserTable dut = dbc.readtable("test", "testid2");
		JsonBuilder jb = new JsonBuilder();
		System.out.println(jb.javaToJson(dut));
	}
}
