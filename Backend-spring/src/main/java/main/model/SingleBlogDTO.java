package main.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import main.domain.Comment;
import main.domain.Tag;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SingleBlogDTO {
	
	private List<Comment> comments;
	private String title;
	private String description;
	private String contentBody;
	private String image;
	private String userImage;
	private UUID userId;
	private int views;
	private String firstName;
	private String lastName;
	private PrevNextBlog prev;
	private PrevNextBlog next;
	private String category;
	private LocalDateTime created;
	private List<Tag> tags  = new ArrayList<>();
	

}
