package database;

import java.util.ArrayList;

import model.UserProfile;

public interface DatabaseController {
	public int create();
	public int insert();
	public UserProfile readtable(String table, String key);
	public int update(String target, String content);
	public int delete();
	public ArrayList<String> getColumns(String table);
}
