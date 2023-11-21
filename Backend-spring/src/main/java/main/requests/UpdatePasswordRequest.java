package main.requests;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@AllArgsConstructor
@Data
@Builder
public class UpdatePasswordRequest {

	@NotNull(message="Required")
	private UUID userId;
	@NotNull(message="Required")
	@Size(min = 5, max = 10, message = "Min length is 5 char and max 10 chars")
	private String oldPassword;
	@NotNull(message="Required")
	@Size(min = 5, max = 10, message = "Min length is 5 char and max 10 chars")
	private String newPassword;
	@NotNull(message="Required")
	@Size(min = 5, max = 10, message = "Min length is 5 char and max 10 chars")
	private String repeatedNewPassword;
	
	

	
	
	
}
