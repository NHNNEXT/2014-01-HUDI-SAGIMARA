package dto;

public class VerifivationList {

	private String phoneNum;
	private String verificationTime;
	private String verificationStatus;
	private String videoLink;
	private String videoDate;
	private String locationCoordinate;
	private String locationTime;

	public VerifivationList(String phoneNum, String verificationTime,
			String verificationStatus, String videoLink, String videoDate,
			String locationCoordinate, String locationTime) {
		this.phoneNum = phoneNum;
		this.verificationTime =verificationTime;
		this.verificationStatus = verificationStatus;
		this.videoLink = videoLink;
		this.videoDate = videoDate;
		this.locationCoordinate = locationCoordinate;
		this.locationTime = locationTime;
	}

	public VerifivationList(String phoneNum, String verificationTime,
			String verificationStatus) {
		this.phoneNum = phoneNum;
		this.verificationTime =verificationTime;
		this.verificationStatus = verificationStatus;
	}

	public String getPhoneNum() {
		return phoneNum;
	}

	public void setPhoneNum(String phoneNum) {
		this.phoneNum = phoneNum;
	}

	public String getVerificationTime() {
		return verificationTime;
	}

	public void setVerificationTime(String verificationTime) {
		this.verificationTime = verificationTime;
	}

	public String getVerificationStatus() {
		return verificationStatus;
	}

	public void setVerificationStatus(String verificationStatus) {
		this.verificationStatus = verificationStatus;
	}

	public String getVideoLink() {
		return videoLink;
	}

	public void setVideoLink(String videoLink) {
		this.videoLink = videoLink;
	}

	public String getVideoDate() {
		return videoDate;
	}

	public void setVideoDate(String videoDate) {
		this.videoDate = videoDate;
	}

	public String getLocationCoordinate() {
		return locationCoordinate;
	}

	public void setLocationCoordinate(String locationCoordinate) {
		this.locationCoordinate = locationCoordinate;
	}

	public String getLocationTime() {
		return locationTime;
	}

	public void setLocationTime(String locationTime) {
		this.locationTime = locationTime;
	}

	
}
