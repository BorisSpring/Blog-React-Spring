package main.requests;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@AllArgsConstructor
@Data
@Builder
public class LoginRequest {

	
	@NotNull(message="Required")
	private String username;
	
	@NotNull(message="Required")
	private String password;

	
	
	
}
