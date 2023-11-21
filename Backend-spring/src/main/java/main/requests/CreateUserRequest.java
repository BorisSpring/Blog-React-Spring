package main.requests;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;


@Getter
@Setter
public class CreateUserRequest {

    @NotNull(message = "First name required")
    private String firstName;

    @NotNull(message = "Last name required")

    private String lastName;

    @NotNull(message = "Number required")
    @Pattern(regexp = "[0-9]+", message = "Only number allowed!")
    private String number;

    @NotNull
    @Email
    private String email;

    @NotNull
    @Size(min = 5, max = 10 , message = "Password must be between 5 and 10 chars!")
    private String password;
    private MultipartFile imageFile;
}
