
package main.dto;

import java.time.LocalDateTime;

public class MainPageBlogDTO {

	private String category;
	private String title;
	private String description;
	private int userId;
	private int id;
	private LocalDateTime created;
	private Long numberOfComments;
	private String firstName;
	private String lastName;
	private String blogImage;
	private String userImage;
	
	public MainPageBlogDTO() {

	}
	
	

	public MainPageBlogDTO(String category, String title, String description, int userId, int id, LocalDateTime created,
			Long numberOfComments, String firstName, String lastName, String blogImage, String userImage) {
		this.category = category;
		this.title = title;
		this.description = description;
		this.userId = userId;
		this.id = id;
		this.created = created;
		this.numberOfComments = numberOfComments;
		this.firstName = firstName;
		this.lastName = lastName;
		this.blogImage = blogImage;
		this.userImage = userImage;
	}

	public String getFirstName() {
		return firstName;
	}


	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}



	public String getLastName() {
		return lastName;
	}



	public void setLastName(String lastName) {
		this.lastName = lastName;
	}



	public void setNumberOfComments(Long numberOfComments) {
		this.numberOfComments = numberOfComments;
	}



	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public LocalDateTime getCreated() {
		return created;
	}

	public void setCreated(LocalDateTime created) {
		this.created = created;
	}



	public Long getNumberOfComments() {
		return numberOfComments;
	}



	public String getBlogImage() {
		return blogImage;
	}



	public void setBlogImage(String blogImage) {
		this.blogImage = blogImage;
	}



	public String getUserImage() {
		return userImage;
	}



	public void setUserImage(String userImage) {
		this.userImage = userImage;
	}

	
	
	
}
