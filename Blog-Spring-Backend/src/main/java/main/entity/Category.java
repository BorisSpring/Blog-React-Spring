package main.entity;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name="category")
public class Category {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY )
	public int id;
	
	@NotNull
	@Size(min = 1, max = 45, message= "Size must be over 1 and les then 45 chars.")
	private String name;
	
	@Column(name="categoryOrder")
	private Integer order;
	
	@OneToMany(mappedBy="category", cascade = {CascadeType.DETACH, CascadeType.REFRESH, CascadeType.MERGE, CascadeType.PERSIST})
	@JsonIgnore
	private List<Blog> blogs = new ArrayList<>();
	
	
	public Category() {

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


	public Integer getOrder() {
		return order;
	}


	public void setOrder(Integer order) {
		this.order = order;
	}


	public List<Blog> getBlogs() {
		return blogs;
	}


	public void setBlogs(List<Blog> blogs) {
		this.blogs = blogs;
	}
	
	
}
