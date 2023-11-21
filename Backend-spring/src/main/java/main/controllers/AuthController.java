package main.controllers;

import java.io.IOException;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import main.requests.CreateUserRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import main.domain.User;
import main.requests.LoginRequest;
import main.response.AuthResponse;
import main.service.UserService;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

	private final UserService userService;

	@PostMapping("/login")
	public ResponseEntity<AuthResponse> loginHandler(@Valid @RequestBody LoginRequest req){
		return ResponseEntity.status(HttpStatus.OK).body(userService.loginUser(req));
	}
	
	@PostMapping("/signup")
	public ResponseEntity<User> signupHandler(@Valid @ModelAttribute CreateUserRequest request) throws IllegalStateException, IOException{
		return ResponseEntity.status(HttpStatus.CREATED).body(userService.createUser(request));
	}
	
	@GetMapping("/logged")
	public ResponseEntity<User> getLoggedUser(@RequestHeader("Authorization")String jwt){
		return ResponseEntity.status(HttpStatus.OK).body(userService.getLoggedUser(jwt));
	}
	

}
