package database;

public class TableVIDEO implements Table {
	private String video_id;
	private String video_link;
	
	public String getVideo_id() {
		return video_id;
	}
	public void setVideo_id(String video_id) {
		this.video_id = video_id;
	}
	public String getVideo_link() {
		return video_link;
	}
	public void setVideo_link(String video_link) {
		this.video_link = video_link;
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
