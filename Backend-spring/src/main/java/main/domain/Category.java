package main.domain;

import java.util.ArrayList;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

@Entity
@Table(name="category")
@Setter
@Getter
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Category extends BaseEntity {


	@NotNull
	@Size(min = 1, max = 45, message= "Size must be over 1 and les then 45 chars.")
	@Column(columnDefinition = "varchar(50)", unique = true)
	private String name;
	
	@Column(name="categoryOrder", unique = true, columnDefinition = "tinyint")
	private Integer order;
	
	@OneToMany(mappedBy="category", cascade = {CascadeType.DETACH, CascadeType.REFRESH, CascadeType.MERGE, CascadeType.PERSIST})
	@JsonIgnore
	private List<Blog> blogs = new ArrayList<>();

	
}
