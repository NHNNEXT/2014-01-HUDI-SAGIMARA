package dto;

public class Verification extends BaseModel{
	private String verificationId;
	private String verificationTime;
	
	public Verification(String verificationId, String verificationTime){
		this.verificationId = verificationId;
		this.verificationTime = verificationTime;
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

}
