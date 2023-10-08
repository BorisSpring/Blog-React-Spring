package main.dto;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


import main.entity.Comment;
import main.entity.Tag;

public class SingleBlogDTO {
	
	private List<Comment> comments;
	private String title;
	private String description;
	private String contentBody;
	private String image;
	private String userImage;
	private int userId;
	private int views;
	private String firstName;
	private String lastName;
	private PrevNextBlog prev;
	private PrevNextBlog next;
	private String category;
	private LocalDateTime created;
	private List<Tag> tags  = new ArrayList<>();
	
	public SingleBlogDTO() {

	}
	
	public LocalDateTime getCreated() {
		return created;
	}

	public void setCreated(LocalDateTime created) {
		this.created = created;
	}

	public PrevNextBlog getPrev() {
		return prev;
	}


	public void setPrev(PrevNextBlog prev) {
		this.prev = prev;
	}


	public PrevNextBlog getNext() {
		return next;
	}


	public void setNext(PrevNextBlog next) {
		this.next = next;
	}


	public int getViews() {
		return views;
	}


	public void setViews(int views) {
		this.views = views;
	}


	public List<Comment> getComments() {
		return comments;
	}

	public void setComments(List<Comment> comments) {
		this.comments = comments;
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

	public String getContentBody() {
		return contentBody;
	}

	public void setContentBody(String contentBody) {
		this.contentBody = contentBody;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public String getUserImage() {
		return userImage;
	}

	public void setUserImage(String userImage) {
		this.userImage = userImage;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
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


	public String getCategory() {
		return category;
	}


	public void setCategory(String category) {
		this.category = category;
	}

	public List<Tag> getTags() {
		return tags;
	}

	public void setTags(List<Tag> list) {
		this.tags = list;
	}

	
	
	
	

	
	
}
