package main.domain;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="Message")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class Message  extends  BaseEntity{


	@Column(updatable = false, nullable = false, columnDefinition = "varchar(50)")
	@NotNull(message= "Name is required")
	@Size(min = 3, max = 50 , message = "Min length is 3 and max lenght is 50 char")
	private String name;

	@Email
	@NotNull(message= "Email is required")
	@Column(updatable = false, nullable = false, columnDefinition = "varchar(255)")
	private String email;

	@Size(min =  10 , max = 500, message = "Min message length is 10 and max 500 chars")
	@NotNull(message= "Message is required")
	@Column(updatable = false, columnDefinition = "varchar(500)", nullable = false)
	private String message;

	private boolean readed;
	
}
