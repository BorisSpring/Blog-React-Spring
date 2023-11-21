package main.domain;

import java.util.ArrayList;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;
import lombok.*;

@Entity
@Table(name="Blog")
@NoArgsConstructor
@Setter
@Getter
@AllArgsConstructor
@Builder
public class Blog extends BaseEntity {


	private Integer important;
	
	@NotNull(message="title required")
	@Size(min= 25, max= 250, message= "Title must be over 25 and less then 250 chars")
	@Column(nullable = false, columnDefinition = "varchar(250)")
	private String title;
	
	private String image;
	

	@PositiveOrZero
	private Integer views = 0;
	
	@NotNull(message="descriptino required")
	@Size(min=50, max= 500, message="Size must be over 50 and less then 500 chars")
	@Column(nullable = false, columnDefinition = "varchar(500)")
	private String description;
	
	@Size(min=50, max= 1000, message="Size must be over 50 and less then 1000 chars")
	@NotNull(message="Blog content body required")
	@Column(nullable = false, columnDefinition = "varchar(1000)")
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
//	@Column(nullable = false)
	private User user;
	
	private boolean enabled;

}
