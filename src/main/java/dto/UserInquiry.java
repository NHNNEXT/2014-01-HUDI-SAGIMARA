package dto;

public class UserInquiry {
	private String phoneNumber;
	private String today;
	private String oneDayAgo;
	private String twoDayAgo;
	private String threeDayAgo;
	private String fourDayAgo;
	private String fiveDayAgo;
	private String sixDayAgo;
	
	public UserInquiry(String phoneNumber, String today, String oneDayAgo,
			String twoDayAgo, String threeDayAgo, String fourDayAgo) {
		// TODO Auto-generated constructor stub
	}
	public String getPhoneNumber() {
		return phoneNumber;
	}
	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}
	public String getToday() {
		return today;
	}
	public void setToday(String today) {
		this.today = today;
	}
	public String getOneDayAgo() {
		return oneDayAgo;
	}
	public void setOneDayAgo(String oneDayAgo) {
		this.oneDayAgo = oneDayAgo;
	}
	public String getTwoDayAgo() {
		return twoDayAgo;
	}
	public void setTwoDayAgo(String twoDayAgo) {
		this.twoDayAgo = twoDayAgo;
	}
	public String getThreeDayAgo() {
		return threeDayAgo;
	}
	public void setThreeDayAgo(String threeDayAgo) {
		this.threeDayAgo = threeDayAgo;
	}
	public String getFourDayAgo() {
		return fourDayAgo;
	}
	public void setFourDayAgo(String fourDayAgo) {
		this.fourDayAgo = fourDayAgo;
	}
	public String getFiveDayAgo() {
		return fiveDayAgo;
	}
	public void setFiveDayAgo(String fiveDayAgo) {
		this.fiveDayAgo = fiveDayAgo;
	}
	public String getSixDayAgo() {
		return sixDayAgo;
	}
	public void setSixDayAgo(String sixDayAgo) {
		this.sixDayAgo = sixDayAgo;
	}

}
