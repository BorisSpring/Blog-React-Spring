package main.exceptions;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import jakarta.validation.ConstraintViolationException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.context.request.WebRequest;

@ControllerAdvice
public class GlobalExceptionHandler {

	@ExceptionHandler(BlogException.class)
	public ResponseEntity<ErrorDetails> blogExceptionHandler(BlogException ex, WebRequest req){
		
		ErrorDetails err = new ErrorDetails(ex.getMessage(),req.getDescription(false), LocalDateTime.now());
		
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(err);
	}

	@ExceptionHandler(SlideException.class)
	public ResponseEntity<ErrorDetails> slideExceptionHandler(SlideException ex, WebRequest req){

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

	@ExceptionHandler(Exception.class)
	public ResponseEntity<ErrorDetails> exceptionHandler(Exception ex, WebRequest req){

		ErrorDetails err = new ErrorDetails("There was error on server!",req.getDescription(false), LocalDateTime.now());

		return ResponseEntity.internalServerError().body(err);
	}


	@ExceptionHandler(DataIntegrityViolationException.class)
	public ResponseEntity<ErrorDetails> dataIntegrityViolationException(DataIntegrityViolationException ex, WebRequest req){

		ErrorDetails err = new ErrorDetails("There was problem with database changes!",req.getDescription(false), LocalDateTime.now());

		return ResponseEntity.internalServerError().body(err);
	}


	@ExceptionHandler(ConstraintViolationException.class)
	public ResponseEntity<Map<String, String>> constraintViolationException(ConstraintViolationException ex, WebRequest req){

		HashMap<String, String> violations = new HashMap<>();

		ex.getConstraintViolations().forEach(constraintViolation -> {
			violations.put(String.valueOf(constraintViolation.getPropertyPath()), constraintViolation.getMessage());
		});

		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(violations);
	}


	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<Map<String, String>> handleValidationExceptions(MethodArgumentNotValidException ex) {
		Map<String, String> errors = new HashMap<>();

		for (FieldError error : ex.getBindingResult().getFieldErrors()) {
			errors.put(error.getField(), error.getDefaultMessage());
			System.out.println(error.getField());
		}

		return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
	}
}
