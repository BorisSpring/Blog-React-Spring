package main.requests;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateCommentRequest {

    @Email
    @NotNull
    private String email;

    @NotNull(message = "Name required")
    private String name;

    @NotNull(message = "Name is required")
    @Size(min = 5, max = 255, message = "Min 5 chars and max 255 chars for comment!")
    private String content;
}
