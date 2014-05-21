package controller;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public interface Controller {

	public abstract String run(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException;

}