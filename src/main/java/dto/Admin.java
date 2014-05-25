package dto;

public class Admin extends BaseModel{
	private String adminId;
	private String adminPassword;
	private String adminName;
	private String adminEmail;
	private String adminStatus;
	
	public Admin(){
	}
	
	public Admin(String adminId, String adminPassword, String adminName, String adminEmail, String adminStatus) {
		super();
		this.adminId = adminId;
		this.adminPassword = adminPassword;
		this.adminName = adminName;
		this.adminEmail = adminEmail;
		this.adminStatus = adminStatus;
	}
	
	public String getAdminId() {
		return adminId;
	}
	public void setAdminId(String adminId) {
		this.adminId = adminId;
	}
	public String getAdminPassword() {
		return adminPassword;
	}
	public void setAdminPassword(String adminPassword) {
		this.adminPassword = adminPassword;
	}
	public String getAdminName() {
		return adminName;
	}
	public void setAdminName(String adminName) {
		this.adminName = adminName;
	}
	public String getAdminEmail() {
		return adminEmail;
	}
	public void setAdminEmail(String adminEmail) {
		this.adminEmail = adminEmail;
	}
	public String getAdminStatus() {
		return adminStatus;
	}
	public void setAdminStatus(String adminStatus) {
		this.adminStatus = adminStatus;
	}

}
