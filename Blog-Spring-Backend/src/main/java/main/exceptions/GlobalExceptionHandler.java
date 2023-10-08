package main.exceptions;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

@ControllerAdvice
public class GlobalExceptionHandler {

	@ExceptionHandler(BlogException.class)
	public ResponseEntity<ErrorDetails> blogExceptionHandler(BlogException ex, WebRequest req){
		
		ErrorDetails err = new ErrorDetails(ex.getMessage(),req.getDescription(false), LocalDateTime.now());
		
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(err);
	}
	
	@ExceptionHandler(UserException.class)
	public ResponseEntity<ErrorDetails> userExceptionHandler(UserException ex, WebRequest req){
		
		ErrorDetails err = new ErrorDetails(ex.getMessage(),req.getDescription(false), LocalDateTime.now());
		
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(err);
	}
	

	@ExceptionHandler(CategoryException.class)
	public ResponseEntity<ErrorDetails> categoryExceptionHandler(CategoryException ex, WebRequest req){
		
		ErrorDetails err = new ErrorDetails(ex.getMessage(),req.getDescription(false), LocalDateTime.now());
		
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(err);
	}
	

	@ExceptionHandler(BadCredentialsException.class)
	public ResponseEntity<ErrorDetails> credentialsExceptionHandler(BadCredentialsException ex, WebRequest req){
		
		ErrorDetails err = new ErrorDetails(ex.getMessage(),req.getDescription(false), LocalDateTime.now());
		
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(err);
	}
	
	@ExceptionHandler(CommentException.class)
	public ResponseEntity<ErrorDetails> commentExceptionHandler(CommentException ex, WebRequest req){
		
		ErrorDetails err = new ErrorDetails(ex.getMessage(),req.getDescription(false), LocalDateTime.now());
		
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(err);
	}
	
	@ExceptionHandler(MessageException.class)
	public ResponseEntity<ErrorDetails> messageExceptionHandler(MessageException ex, WebRequest req){
		
		ErrorDetails err = new ErrorDetails(ex.getMessage(),req.getDescription(false), LocalDateTime.now());
		
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(err);
	}
	
	@ExceptionHandler(TagException.class)
	public ResponseEntity<ErrorDetails> tagExceptionHandler(TagException ex, WebRequest req){
		
		ErrorDetails err = new ErrorDetails(ex.getMessage(),req.getDescription(false), LocalDateTime.now());
		
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(err);
	}
	

}
