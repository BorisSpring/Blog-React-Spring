package main.exceptions;

public class BlogException extends RuntimeException{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public BlogException(String message) {
		super(message);
	}
}
