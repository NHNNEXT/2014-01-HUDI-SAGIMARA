package database;

public class TableINQUIRY implements Table {
	private String inquiry_id;
	private String inquiry_time;
	
	public String getInquiry_id() {
		return inquiry_id;
	}
	public void setInquiry_id(String inquiry_id) {
		this.inquiry_id = inquiry_id;
	}
	public String getInquiry_time() {
		return inquiry_time;
	}
	public void setInquiry_time(String inquiry_time) {
		this.inquiry_time = inquiry_time;
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
