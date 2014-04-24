package model;

public class UserProfile extends BaseModel{
	private String profilePhone;
	private String profileStatus;
	private String profileVerification;
	private String profileLocation;
	private String profileWatch;
	private String profileNotify;
	private String[] profileInquiry;
	
	public UserProfile() {
	}
	
	public UserProfile(String profilePhone, String profileStatus,
			String profileVerification, String profileVideo,
			String profileLocation, String profileInquiry, String profileNotify) {
		super();
		this.profilePhone = profilePhone;
		this.profileStatus = profileStatus;
		this.profileVerification = profileVerification;
		this.profileLocation = profileVideo;
		this.profileLocation = profileLocation;
		this.profileWatch = profileInquiry;
		this.profileNotify = profileNotify;
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
	public String[] getProfileInquiry() {
		return profileInquiry;
	}
	public void setProfileInquiry(String[] profileInquiry) {
		this.profileInquiry = profileInquiry;
	}
	
}
