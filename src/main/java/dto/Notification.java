package dto;

public class Notification extends BaseModel{
	private String notificationFrom;
	private String notificationTo;
	private String notificationDate;
	private String notificationText;
	
	Notification(String from,String to,String date,String text){
		this.notificationFrom = from;
		this.notificationTo = to;
		this.notificationDate = date;
		this.notificationText = text;
	}
	
	public String getNotificationFrom() {
		return notificationFrom;
	}
	public void setNotificationFrom(String notificationFrom) {
		this.notificationFrom = notificationFrom;
	}
	public String getNotificationTo() {
		return notificationTo;
	}
	public void setNotificationTo(String notificationTo) {
		this.notificationTo = notificationTo;
	}
	public String getNotificationDate() {
		return notificationDate;
	}
	public void setNotificationDate(String notificationDate) {
		this.notificationDate = notificationDate;
	}
	public String getNotificationText() {
		return notificationText;
	}
	public void setNotificationText(String notificationText) {
		this.notificationText = notificationText;
	}

}
