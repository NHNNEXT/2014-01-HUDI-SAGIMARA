package dto;

public class RequestList extends BaseModel{
	private String requestFrom;
	private String requestDate;
	private String requestCount;
	
	public RequestList(String requestFrom, String requestDate, String requestCount) {
		super();
		this.requestFrom = requestFrom;
		this.requestDate = requestDate;
		this.requestCount = requestCount;
	}
	public RequestList() {
		// TODO Auto-generated constructor stub
	}
	public String getRequestFrom() {
		return requestFrom;
	}
	public void setRequestFrom(String requestFrom) {
		this.requestFrom = requestFrom;
	}
	public String getRequestDate() {
		return requestDate;
	}
	public void setRequestDate(String requestDate) {
		this.requestDate = requestDate;
	}
	public String getRequestCount() {
		return requestCount;
	}
	public void setRequestCount(String requestCount) {
		this.requestCount = requestCount;
	}
	
}
