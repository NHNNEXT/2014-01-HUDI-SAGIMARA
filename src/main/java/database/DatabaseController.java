package database;

import java.util.ArrayList;

public interface DatabaseController {
	public int create();
	public int insert();
	public TableUSER_PROFILE readtable(String table, String key);
	public int update(String target, String content);
	public int delete();
	public ArrayList<String> getColumns(String table);
}
