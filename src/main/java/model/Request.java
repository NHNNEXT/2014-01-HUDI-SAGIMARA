package model;

public class Request extends BaseModel{
	private String requestFrom;
	private String requestTo;
	private String requestDate;
	
	public String getRequestFrom() {
		return requestFrom;
	}
	public void setRequestFrom(String requestFrom) {
		this.requestFrom = requestFrom;
	}
	public String getRequestTo() {
		return requestTo;
	}
	public void setRequestTo(String requestTo) {
		this.requestTo = requestTo;
	}
	public String getRequestDate() {
		return requestDate;
	}
	public void setRequestDate(String requestDate) {
		this.requestDate = requestDate;
	}
}
