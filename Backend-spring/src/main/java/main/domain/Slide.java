package main.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name="slide")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Slide extends  BaseEntity {

	@Builder
	public Slide(UUID id, LocalDateTime createdDate, LocalDateTime lastModified, String image, String title, String buttonTitle, String buttonUrl, boolean enabled, Integer orderNumber) {
		super(id, createdDate, lastModified);
		this.image = image;
		this.title = title;
		this.buttonTitle = buttonTitle;
		this.buttonUrl = buttonUrl;
		this.enabled = enabled;
		this.orderNumber = orderNumber;
	}

	@Column(nullable = false)
	@NotNull(message = "Image required")
	private String image;

	@Column(nullable = false, columnDefinition = "varchar(50)")
	@Size(min = 5 , max = 50, message = "Min lenght is 5  char and max 50 chars!")
	@NotNull(message = "Title required")
	private String title;

	@Column(nullable = false, columnDefinition = "varchar(100)")
	@Size(min = 5, max = 30, message = "Min size is 5 and max 30 chars")
	@NotNull(message = "Button Title required")
	private String buttonTitle;

	@Column(nullable = false)
	@NotNull(message = "Button url required!")
	@NotNull(message = "Button url required")
	private String buttonUrl;

	private boolean enabled;
	
	private Integer orderNumber;

	
}
