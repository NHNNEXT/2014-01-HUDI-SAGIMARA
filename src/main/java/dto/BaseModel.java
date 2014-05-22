package dto;

public class BaseModel {
	private String tableName;

	
	
	
	public String getTableName() {
		this.tableName = this.getClass().getName().split("dto.")[1]
				.toUpperCase();
		
		return tableName;
	}

	public void setTableName(String tableName) {
		this.tableName = tableName;
	}
	
	
}
