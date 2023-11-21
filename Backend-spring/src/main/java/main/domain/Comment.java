package main.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="comment")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Comment extends BaseEntity {


	
	@ManyToOne(cascade = {CascadeType.DETACH, CascadeType.REFRESH, CascadeType.MERGE, CascadeType.PERSIST})
	@JoinColumn(name="blog_id")
	@JsonIgnore
	private Blog blog;

	
	@NotNull(message="Name required")
	@Size(min = 3 , max = 20 , message = "Minimum lenght is 3 maximum length is 20 chars")
	@Column(updatable = false, nullable = false, columnDefinition = "varchar(20)")
	private String name;
	
	@NotNull(message="Email required")
	@Email
	@Column(nullable = false, updatable = false)
	private String email;


	@Column(nullable = false, updatable = false)
	@NotNull(message="Comment content required")
	private String content;
	
	private boolean enabled;

	
	
}
