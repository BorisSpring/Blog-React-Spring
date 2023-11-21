package main.domain;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Table(name="Users")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class User extends BaseEntity {


	@Column(columnDefinition = "varchar(50)", nullable = false)
	@NotNull
	@Size(min = 2, max = 50 , message = "Min size is 2 and max 50 chars")
	private String firstName;

	@Column(columnDefinition = "varchar(30)", nullable = false)
	@NotNull
	@Size(min = 2 , max = 30, message = "Min length is 2 char and max 30 chars")
	private String lastName;

	@Column(unique = true,nullable = false)
	@NotNull
	@Email
	private String email;

	@Pattern(regexp = "[0-9]+", message = "Number must contain only numbers")
	@Column(columnDefinition = "varchar(50)", unique = true, nullable = false)
	private String number;
	private String image;
	@JsonIgnore
	@NotNull
	@Column(nullable = false)
	private String password;
	private boolean enabled;
	
	
	@ManyToOne( cascade = {CascadeType.DETACH,CascadeType.MERGE,CascadeType.PERSIST,CascadeType.REFRESH})
	@JoinColumn(name="authority_id")
	private Authority authority;
	
	@JsonIgnore
	@OneToMany(mappedBy="user",  cascade = CascadeType.ALL)
	public List<Blog> blogs = new ArrayList<>();


	
}
