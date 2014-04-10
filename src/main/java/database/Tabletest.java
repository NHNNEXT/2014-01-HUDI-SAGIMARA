package database;

public class Tabletest implements Table{
	private String id;
	private String name;
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	@Override
	public Table getter() {
		// TODO Auto-generated method stub
		return null;
	}
	@Override
	public void setter(Table table) {
		// TODO Auto-generated method stub
		
	}
	
}
