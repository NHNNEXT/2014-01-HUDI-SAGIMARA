package dto;

public class VerificationListForVerify extends BaseModel{

	private String userID;
	private String verificationTime;
	private String verificationStatus;
	private String currentStatus;
	private String verification;
	private String location;
	private String location_coordinate;
	private String location_time;
	private String videoLink;
	private String videoDate;

	
	public VerificationListForVerify(String phone_number, String verification_time,
			String verification_status, String current_status, String verification, String location,
			String location_coordinate, String location_time, String video_link, String video_date) {
		
		this.userID = phone_number;
		this.verificationTime = verification_time;
		this.verificationStatus = verification_status;
		this.currentStatus = current_status;
		this.verification = verification;
		this.location = location;
		this.location_coordinate = location_coordinate;
		this.location_time = location_time;
		this.videoLink = video_link;
		this.videoDate = video_date;
	}
}
