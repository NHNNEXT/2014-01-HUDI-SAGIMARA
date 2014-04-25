package model;

public class BaseModel {
	private String tableName;

	
	
	
	public String getTableName() {
		tableName = this.getClass().getName().split("model.")[1]
				.toUpperCase();
		
		return tableName;
	}

	public void setTableName(String tableName) {
		this.tableName = tableName;
	}
	
	
}
