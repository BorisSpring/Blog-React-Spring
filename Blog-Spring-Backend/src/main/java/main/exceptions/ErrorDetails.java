package main.exceptions;

import java.time.LocalDateTime;



public class ErrorDetails {

	private String msg;
	private String description;
	private LocalDateTime timestamp;
	
	public ErrorDetails(String msg, String description, LocalDateTime timestamp) {
		this.msg = msg;
		this.description = description;
		this.timestamp = timestamp;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public LocalDateTime getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(LocalDateTime timestamp) {
		this.timestamp = timestamp;
	}

	
	
}
