package main.controllers;

import java.io.IOException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import main.entity.User;
import main.request.LoginRequest;
import main.response.AuthResponse;
import main.service.UserService;

@RestController
@RequestMapping("/auth")
public class AuthController {

	private UserService userService;
	

	
	public AuthController(UserService userService) {
		this.userService = userService;
	}

	@PostMapping("/login")
	public ResponseEntity<AuthResponse> loginHandler(@RequestBody LoginRequest req){
		
		return ResponseEntity.status(HttpStatus.OK).body(userService.loginUser(req));
	}
	
	@PostMapping("/signup")
	public ResponseEntity<User> signupHandler(@RequestParam("firstName") String firstName,
			@RequestParam("lastName") String lastName,
			@RequestParam("number") String number,
			@RequestParam("email") String email,
			@RequestParam("password") String password,
			@RequestParam( required = false,  name= "image") MultipartFile file) throws IllegalStateException, IOException{
		
		return ResponseEntity.status(HttpStatus.OK).body(userService.createUser(lastName, number, email, password, firstName, file));
		
	}
	
	@GetMapping("/logged")
	public ResponseEntity<?> getLoggedUser(@RequestHeader("Authorization")String jwt){
			
		return ResponseEntity.status(HttpStatus.OK).body(userService.getLoggedUser(jwt));
	}
	

}
