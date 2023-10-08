package main.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
public class Tag {

	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY )
	public int id;
	
	@NotNull
	@Size(min = 1, max = 45, message= "Size must be over 1 and les then 45 chars.")
	private String name;
	
	
	private LocalDateTime createdAt;
	
	
	@ManyToMany
	@JoinTable(name="blog_tag",
	joinColumns = @JoinColumn(name="tag_id"),
	inverseJoinColumns = @JoinColumn(name="blog_id"))
	@JsonIgnore
	private List<Blog> blogs = new ArrayList<>();
	
	
	public Tag() {

	}


	public int getId() {
		return id;
	}


	public void setId(int id) {
		this.id = id;
	}


	public String getName() {
		return name;
	}


	public void setName(String name) {
		this.name = name;
	}


	public LocalDateTime getCreatedAt() {
		return createdAt;
	}


	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}


	public List<Blog> getBlogs() {
		return blogs;
	}


	public void setBlogs(List<Blog> blogs) {
		this.blogs = blogs;
	}
	
	
	
}
