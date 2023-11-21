package main.domain;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class Tag extends  BaseEntity {

	

	@Column(nullable = false, columnDefinition = "varchar(45)")
	@NotNull
	@Size(min = 1, max = 45, message= "Size must be over 1 and les then 45 chars.")
	private String name;
	

	
	
	@ManyToMany
	@JoinTable(name="blog_tag",
	joinColumns = @JoinColumn(name="tag_id"),
	inverseJoinColumns = @JoinColumn(name="blog_id"))
	@JsonIgnore
	private List<Blog> blogs = new ArrayList<>();
	
	

	
	
}
