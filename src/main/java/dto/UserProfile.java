package dto;

public class UserProfile extends BaseModel{
	private String profilePhone;
	private String profileStatus;
	private String profileVerification;
	private String profileLocation;
	private String profileWatch;
	private String profileNotify;
	private UserInquiry profileInquiry;
	
	public UserProfile() {
	}
	
	public UserProfile(String profilePhone, String profileStatus, String profileVerification, String profileLocation, String profileWatch, String profileNotify, UserInquiry profileInquiry) {
		this.profilePhone = profilePhone;
		this.profileStatus = profileStatus;
		this.profileVerification = profileVerification;
		this.profileLocation = profileLocation;
		this.profileWatch = profileWatch;
		this.profileNotify = profileNotify;
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
	public String getProfileLocation() {
		return profileLocation;
	}
	public void setProfileLocation(String profileLocation) {
		this.profileLocation = profileLocation;
	}
	public String getProfileWatch() {
		return profileWatch;
	}
	public void setProfileWatch(String profileWatch) {
		this.profileWatch = profileWatch;
	}
	public String getProfileNotify() {
		return profileNotify;
	}
	public void setProfileNotify(String profileNotify) {
		this.profileNotify = profileNotify;
	}
	public UserInquiry getProfileInquiry() {
		return profileInquiry;
	}	
}
