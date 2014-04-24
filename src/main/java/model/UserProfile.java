package model;

public class UserProfile extends BaseModel{
	private String profilePhone;
	private String profileStatus;
	private String profileVerification;
	private String profileVideo;
	private String profileLocation;
	private String profileInquiry;
	
	public UserProfile() {
	}
	
	public UserProfile(String profilePhone, String profileStatus,
			String profileVerification, String profileVideo,
			String profileLocation, String profileInquiry) {
		super();
		this.profilePhone = profilePhone;
		this.profileStatus = profileStatus;
		this.profileVerification = profileVerification;
		this.profileVideo = profileVideo;
		this.profileLocation = profileLocation;
		this.profileInquiry = profileInquiry;
	}
	
	public String getProfilePhone() {
		return profilePhone;
	}
	public void setProfilePhone(String profilePhone) {
		this.profilePhone = profilePhone;
	}
	public String getProfileStatus() {
		return profileStatus;
	}
	public void setProfileStatus(String profileStatus) {
		this.profileStatus = profileStatus;
	}
	public String getProfileVerification() {
		return profileVerification;
	}
	public void setProfileVerification(String profileVerification) {
		this.profileVerification = profileVerification;
	}
	public String getProfileVideo() {
		return profileVideo;
	}
	public void setProfileVideo(String profileVideo) {
		this.profileVideo = profileVideo;
	}
	public String getProfileLocation() {
		return profileLocation;
	}
	public void setProfileLocation(String profileLocation) {
		this.profileLocation = profileLocation;
	}
	public String getProfileInquiry() {
		return profileInquiry;
	}
	public void setProfileInquiry(String profileInquiry) {
		this.profileInquiry = profileInquiry;
	}
	
}
