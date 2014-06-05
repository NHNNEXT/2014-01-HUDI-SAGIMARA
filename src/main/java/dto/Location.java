package dto;

public class Location extends BaseModel {
	private String locationId;
	private String locationTime;
	private String locationCoordinate;
	
	public Location() {
	}

	public Location(String locationId, String locationTime,
			String locationCoordinate) {
		this.locationId = locationId;
		this.locationTime = locationTime;
		this.locationCoordinate = locationCoordinate;
	}

	public String getLocationId() {
		return locationId;
	}

	public void setLocationId(String locationId) {
		this.locationId = locationId;
	}

	public String getLocationTime() {
		return locationTime;
	}

	public void setLocationTime(String locationTime) {
		this.locationTime = locationTime;
	}

	public String getLocationCoordinate() {
		return locationCoordinate;
	}

	public void setLocationCoordinate(String locationCoordinate) {
		this.locationCoordinate = locationCoordinate;
	}

}
