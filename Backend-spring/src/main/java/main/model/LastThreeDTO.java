package main.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class LastThreeDTO {

	private UUID id;
	private String title;
	private LocalDateTime created;
	private String image;
	private Integer numberOfViews;
	private Long numberOfComments;

	
}
