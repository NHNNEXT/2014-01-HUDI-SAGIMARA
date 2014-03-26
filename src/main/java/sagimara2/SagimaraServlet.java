package sagimara2;

import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;

public class SagimaraServlet extends HttpServlet {

	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out = response.getWriter();
		out.println("SagimaraServlet Executed!!!!");
		out.flush();
		out.close();
	}
}
