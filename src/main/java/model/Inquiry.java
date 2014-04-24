package model;

public class Inquiry extends BaseModel{
	private String inquiryId;
	private String inquiryTime;
	
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
