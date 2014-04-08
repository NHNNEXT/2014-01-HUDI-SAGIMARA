package framework;

public interface DatabaseController {
	public int create();
	public int insert();
	public DatabaseUserTable readtable(String table, String key);
	public int update(String target, String content);
	public int delete();
}
