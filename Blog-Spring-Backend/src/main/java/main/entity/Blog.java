package main.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name="Blog")
public class Blog {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY )
	@Column(name="id")
	public int id;
	
	private Integer important;
	
	@NotNull(message="title required")
	@Size(min= 45, max= 250, message= "Title must be over 45 and less then 250 chars")
	private String title;
	
	private String image;
	
	private LocalDateTime created;
	
	private int views;
	
	@NotNull(message="descriptino required")
	@Size(min=50, max= 500, message="Size must be over 50 and less then 500 chars")
	private String description;
	
	@Size(min=50, message="Size must be over 50 and less then 500 chars")
	@NotNull(message="Blog content body required")
	private String contentBody;
	
	@ManyToOne( cascade = {CascadeType.DETACH, CascadeType.REFRESH, CascadeType.MERGE, CascadeType.PERSIST})
	@JoinColumn(name="category_id")
	private Category category;
	
	@JsonIgnore
	@OneToMany(mappedBy="blog", cascade = CascadeType.ALL)
	private List<Comment> comments = new ArrayList<>();
	
	@JsonIgnore
	@ManyToMany
	@JoinTable(name="blog_tag",
	joinColumns = @JoinColumn(name="blog_id"),
	inverseJoinColumns = @JoinColumn(name="tag_id"))
	private List<Tag> tags = new ArrayList<>();
	
	@ManyToOne(cascade = {CascadeType.DETACH, CascadeType.REFRESH, CascadeType.MERGE, CascadeType.PERSIST})
	@JoinColumn(name="user_id")
	private User user;
	
	private boolean enabled;
	
	
	public Blog() {

	}
	
	

	public User getUser() {
		return user;
	}



	public void setUser(User user) {
		this.user = user;
	}



	public int getId() {
		return id;
	}


	public void setId(int id) {
		this.id = id;
	}


	public Integer getImportant() {
		return important;
	}


	public void setImportant(Integer important) {
		this.important = important;
	}


	public String getTitle() {
		return title;
	}


	public void setTitle(String title) {
		this.title = title;
	}


	public String getImage() {
		return image;
	}


	public void setImage(String image) {
		this.image = image;
	}
	
	public LocalDateTime getCreated() {
		return created;
	}



	public void setCreated(LocalDateTime created) {
		this.created = created;
	}



	public int getViews() {
		return views;
	}


	public void setViews(int views) {
		this.views = views;
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


	public Category getCategory() {
		return category;
	}


	public void setCategory(Category category) {
		this.category = category;
	}


	public List<Comment> getComments() {
		return comments;
	}


	public void setComments(List<Comment> comments) {
		this.comments = comments;
	}


	public List<Tag> getTags() {
		return tags;
	}


	public void setTags(List<Tag> tags) {
		this.tags = tags;
	}



	public boolean isEnabled() {
		return enabled;
	}



	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}
	
	
	
}
