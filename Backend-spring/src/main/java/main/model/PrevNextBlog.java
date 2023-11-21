package main.model;

import lombok.*;

import java.util.UUID;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PrevNextBlog {

	private UUID id;
	private String title;

}
