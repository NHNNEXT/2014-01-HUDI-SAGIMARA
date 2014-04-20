package framework;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileItemFactory;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

import type.UserProfile;
import database.DatabaseByMysql;
import database.DatabaseController;

public class FrontController extends HttpServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	HashMap<String, String> map = new HashMap<String, String>();
	DatabaseController dbc;
	JsonBuilder jb;

	@Override
	public void init() throws ServletException {
		super.init();
		map.put("/test", "/test.jsp");
		map.put("/index", "/index.jsp");

		dbc = new DatabaseByMysql();
		jb = new JsonBuilder();
	}

	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		String path = request.getServletPath();
		String result = map.get(path);
		response.setCharacterEncoding("utf8");
		request.setCharacterEncoding("utf8");

		if (result != null) {
			RequestDispatcher dispather = getServletContext()
					.getRequestDispatcher(result);
			dispather.forward(request, response);
		} else {
			request.setAttribute("error", "존재하지 않는 주소입니다");
			RequestDispatcher dispather = getServletContext()
					.getRequestDispatcher("/error.jsp");
			dispather.forward(request, response);
		}

	}

	@Override
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		String path = request.getServletPath();

		if (path.equals("/test")) {
			test(request, response);
		}

		// super.doPost(request, response);
	}

	private void test(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String path = request.getServletPath();
		String result = map.get(path);
		String id = null;
		System.out.println(request.getHeader("Content-type"));

		boolean isMultipart = ServletFileUpload.isMultipartContent(request);
		if (isMultipart) {
			FileItemFactory factory = new DiskFileItemFactory();
			ServletFileUpload upload = new ServletFileUpload(factory);
			List items = null;
			try {
				items = upload.parseRequest(request);
			} catch (FileUploadException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			Iterator ir = items.iterator();
			while (ir.hasNext()) {
		        FileItem item = (FileItem) ir.next();

		        if (item.isFormField()) {
		            // Process form field.
		            String name = item.getFieldName();
		            String value = item.getString();
		            id = value;
		            System.out.println(name + value);
		        } else {
		            // Process uploaded file.
		            //String fieldName = item.getFieldName();
		            //String fileName = item.getName();
		            //String contentType = item.getContentType();
		            //boolean isInMemory = item.isInMemory();
		            //long sizeInBytes = item.getSize();
		        }
		    }
			
		} else {
			id = (String) request.getParameter("id");
		}

		System.out.println(id);
		if(!id.isEmpty()) {
			UserProfile dut = dbc.readtable("USER_PROFILE", id);
			String json = jb.javaToJson(dut);
			System.out.println(json);
			response.setCharacterEncoding("utf8");
			request.setCharacterEncoding("utf8");
			request.setAttribute("json", json);
		} else {
			System.out.println("id is null");
		}
		
		if (!result.isEmpty()) {
			RequestDispatcher dispather = getServletContext()
					.getRequestDispatcher(result);
			dispather.forward(request, response);
		} else {
			System.out.println("path error");
			System.out.println(path);
			System.out.println(result);
		}
	}
}
