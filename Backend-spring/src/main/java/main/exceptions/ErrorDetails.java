package main.exceptions;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;


@Getter
@Setter
public class ErrorDetails {

	private String msg;
	private String description;
	private LocalDateTime timestamp;
	
	public ErrorDetails(String msg, String description, LocalDateTime timestamp) {
		this.msg = msg;
		this.description = description;
		this.timestamp = timestamp;
	}


	
}
