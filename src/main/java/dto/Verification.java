package dto;

public class Verification extends BaseModel{
	private String verificationId;
	private String verificationTime;
	private String verificationStatus;
	
	public Verification(String verificationId, String verificationTime, String verificationStatus){
		this.verificationId = verificationId;
		this.verificationTime = verificationTime;
		this.verificationStatus = verificationStatus;
	}
	
	public String getVerificationId() {
		return verificationId;
	}
	public void setVerificationId(String verificationId) {
		this.verificationId = verificationId;
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

}
