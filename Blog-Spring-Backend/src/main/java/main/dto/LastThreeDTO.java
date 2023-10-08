package main.dto;

import java.time.LocalDateTime;

public class LastThreeDTO {

	private Integer id;
	private String title;
	private LocalDateTime created;
	private String image;
	private Integer numberOfViews;
	private Long numberOfComments;

	public LastThreeDTO(Integer id, String title, String image, LocalDateTime created, Long numberOfComments, int numberOfViews) {
		this.id = id;
		this.title = title;
		this.image = image;
		this.created = created;
		this.numberOfComments = numberOfComments;
		this.numberOfViews = numberOfViews;
	}

	public String getImage() {
		return image;
	}

	public LocalDateTime getCreated() {
		return created;
	}

	public void setCreated(LocalDateTime created) {
		this.created = created;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public Integer getNumberOfViews() {
		return numberOfViews;
	}

	public void setNumberOfViews(Integer numberOfViews) {
		this.numberOfViews = numberOfViews;
	}

	public Long getNumberOfComments() {
		return numberOfComments;
	}

	public void setNumberOfComments(Long numberOfComments) {
		this.numberOfComments = numberOfComments;
	}

	
	
	
	

	
}
