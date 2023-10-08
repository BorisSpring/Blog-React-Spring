package main.request;

import jakarta.validation.constraints.NotNull;

public class LoginRequest {

	
	@NotNull(message="Required")
	private String username;
	
	@NotNull(message="Required")
	private String password;
	
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	
	@Override
	public String toString() {
		return "LoginRequest [username=" + username + ", password=" + password + "]";
	}
	
	
	
}
