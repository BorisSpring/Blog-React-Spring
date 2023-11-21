package main.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class BlogDTO {

	private UUID id;
	private Boolean enabled;
	private String title;
	private Integer important;
	private String categoryName;

	
}
