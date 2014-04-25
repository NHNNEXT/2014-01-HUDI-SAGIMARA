package model;

import java.text.SimpleDateFormat;
import java.util.Calendar;

public class Inquiry extends BaseModel{
	private String inquiryId;
	private String inquiryTime;
	
	Inquiry(){
	}
	
	public Inquiry(User user){
		this.inquiryId = user.getUserPhone();
		Calendar calendar = Calendar.getInstance();
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		this.inquiryTime = dateFormat.format(calendar.getTime()); 
	}
	
	public String getInquiryId() {
		return inquiryId;
	}
	public void setInquiryId(String inquiryId) {
		this.inquiryId = inquiryId;
	}
	public String getInquiryTime() {
		return inquiryTime;
	}
	public void setInquiryTime(String inquiryTime) {
		this.inquiryTime = inquiryTime;
	}
}
