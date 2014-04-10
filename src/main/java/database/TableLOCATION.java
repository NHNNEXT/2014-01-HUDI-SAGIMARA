package database;

public class TableLOCATION implements Table{
	private String location_id;
	private String location_time;
	private String location_coordinate;
	
	public String getLocation_id() {
		return location_id;
	}
	public void setLocation_id(String location_id) {
		this.location_id = location_id;
	}
	public String getLocation_time() {
		return location_time;
	}
	public void setLocation_time(String location_time) {
		this.location_time = location_time;
	}
	public String getLocation_coordinate() {
		return location_coordinate;
	}
	public void setLocation_coordinate(String location_coordinate) {
		this.location_coordinate = location_coordinate;
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
