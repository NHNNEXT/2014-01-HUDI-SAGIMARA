package controller;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import utility.JsonBuilder;
import database.DatabaseHandler;

public class InsertLocationDataController implements Controller {
	private DatabaseHandler dbh;
	private JsonBuilder jb;
	private String forwardPath;

	public InsertLocationDataController(String forwardPath) {
		super();
		this.dbh = DatabaseHandler.getDatabaseHandler();
		this.jb = JsonBuilder.getJsonBuilder();
		this.forwardPath = forwardPath;

	}

	/* (non-Javadoc)
	 * @see controller.Controller#run()
	 */
	@Override
	public String run(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		String phone = (String) request.getParameter("id");
		String time = (String) request.getParameter("date");
		String cordinate = (String) request.getParameter("location");
		String json;
		
		if(dbh.insertLocation(phone, time, cordinate)){
			json = jb.requestSuccessJSON();
		}else{
			json = jb.requestFailedJSON();
		}
		
		request.setAttribute("json", json);
		return forwardPath;

	}
}
