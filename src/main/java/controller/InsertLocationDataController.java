package controller;

import java.io.IOException;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import utility.JsonBuilder;
import database.LocationDAO;
import dto.Location;

public class InsertLocationDataController implements Controller {
	private JsonBuilder jb;
	private String forwardPath;

	public InsertLocationDataController(String forwardPath) {
		super();
		this.jb = JsonBuilder.getJsonBuilder();
		this.forwardPath = forwardPath;

	}

	/* (non-Javadoc)
	 * @see controller.Controller#run()
	 */
	@Override
	public String run(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		LocationDAO locationDAO = new LocationDAO();
		Location location = new Location((String) request.getParameter("id"), (String) request.getParameter("date"), (String) request.getParameter("location"));
		String json = null;
		
		try {
			if(locationDAO.add(location)){
				json = jb.requestSuccessJSON();
			}else{
				json = jb.requestFailedJSON();
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		request.setAttribute("json", json);
		return forwardPath;

	}
}
