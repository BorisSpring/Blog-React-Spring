package main.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import java.util.UUID;

@AllArgsConstructor
@Data
@Builder
public class CategoryDTO {

	private UUID id;
	private String name;
	private Integer order;
	private Long blogsCount;


	
}
