
package main.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class MainPageBlogDTO {

	private String category;
	private String title;
	private String description;
	private UUID userId;
	private UUID id;
	private LocalDateTime created;
	private Long numberOfComments;
	private String firstName;
	private String lastName;
	private String blogImage;
	private String userImage;

}
