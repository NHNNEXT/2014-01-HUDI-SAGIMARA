package dto;

public class User extends BaseModel{
	private String userPhone;
	private String userVerification;
	private String userStatus;
	private String userLocation;
	
	public User(){
	}
	
	public User(String userPhone, String userVerification, String userStatus, String userLocation){
		this.userPhone = userPhone;
		this.userVerification = userVerification;
		this.userStatus = userStatus;
		this.userLocation = userLocation;
	}
	
	public String getUserPhone() {
		return userPhone;
	}
	public void setUserPhone(String userPhone) {
		this.userPhone = userPhone;
	}
	public String getUserVerification() {
		return userVerification;
	}
	public void setUserVerification(String userVerification) {
		this.userVerification = userVerification;
	}
	public String getUserStatus() {
		return userStatus;
	}
	public void setUserStatus(String userStatus) {
		this.userStatus = userStatus;
	}
	public String getUserLocation() {
		return userLocation;
	}
	public void setUserLocation(String userLocation) {
		this.userLocation = userLocation;
	}
	
}
