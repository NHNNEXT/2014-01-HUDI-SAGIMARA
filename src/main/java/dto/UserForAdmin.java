package dto;

public class UserForAdmin extends BaseModel{
	private String userID;
	private String userStatus;
	private String userVerification;
	private String VerificationStatus;
	private String verificationTime;
	private String location;
	private String locationCoordinate;
	private String locationTime;
	private String videoLink;
	private String videoDate;
	private String watch;
	private String notify;
	
	
	public UserForAdmin(String phone_number, String status, String verification, String verification_status, String verification_time,
					String location, String location_coordinate, String location_time, 
					String video_link, String video_date, String watch, String notify){
		this.userID 			= phone_number;
		this.userStatus 		= status;
		this.userVerification 	= verification;
		this.VerificationStatus = verification_status;
		this.verificationTime 	= verification_time;
		this.location 			= location;
		this.locationCoordinate = location_coordinate;
		this.locationTime 		= location_time;
		this.videoLink 			= video_link;
		this.videoDate 			= video_date;
		this.watch 				= watch;
		this.notify 			= notify;
	}


	public String getUserID() {
		return userID;
	}


	public void setUserID(String userID) {
		this.userID = userID;
	}


	public String getUserStatus() {
		return userStatus;
	}


	public void setUserStatus(String userStatus) {
		this.userStatus = userStatus;
	}


	public String getUserVerification() {
		return userVerification;
	}


	public void setUserVerification(String userVerification) {
		this.userVerification = userVerification;
	}


	public String getVerificationStatus() {
		return VerificationStatus;
	}


	public void setVerificationStatus(String verificationStatus) {
		VerificationStatus = verificationStatus;
	}


	public String getVerificationTime() {
		return verificationTime;
	}


	public void setVerificationTime(String verificationTime) {
		this.verificationTime = verificationTime;
	}


	public String getLocation() {
		return location;
	}


	public void setLocation(String location) {
		this.location = location;
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


	public String getWatch() {
		return watch;
	}


	public void setWatch(String watch) {
		this.watch = watch;
	}


	public String getNotify() {
		return notify;
	}


	public void setNotify(String notify) {
		this.notify = notify;
	}


	
}
