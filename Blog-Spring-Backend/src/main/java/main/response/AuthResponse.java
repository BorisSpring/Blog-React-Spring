package main.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {

	private boolean isAuth;
	private String jwt;
	
	public boolean isAuth() {
		return isAuth;
	}
	
	public void setAuth(boolean isAuth) {
		this.isAuth = isAuth;
	}
	public String getJwt() {
		return jwt;
	}
	public void setJwt(String jwt) {
		this.jwt = jwt;
	}

	public AuthResponse(boolean isAuth, String jwt) {
		this.isAuth = isAuth;
		this.jwt = jwt;
	}
	
	
	
}
