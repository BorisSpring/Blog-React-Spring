package main.requests;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@ToString
public class CreateBlogRequest {


    private UUID categoryId;

    @NotNull
    @Size(min = 5 , max = 100, message = "Size must be between 5 and 100 chars")
    private String title;


    @NotNull
    @Size(min = 20 , max = 255, message = "Size must be between 20 and 255 chars")
    private String description;

    @NotNull
    @Size(min = 20 , max = 500, message = "Size must be between 20 and 500 chars")
    private String contentBody;

    @NotNull
    private UUID userId;
    private UUID blogId;
    private MultipartFile image;
    private List<UUID> tagsId = new ArrayList<>();
}
