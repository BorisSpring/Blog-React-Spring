package main.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name="authority")
@NoArgsConstructor
@Setter
@Getter
public class Authority extends BaseEntity {

	@Builder
	public Authority(UUID id, LocalDateTime createdDate, LocalDateTime lastModified, String authority) {
		super(id, createdDate, lastModified);
		this.authority = authority;
	}

	@NotNull
	@Column(unique = true, columnDefinition = "varchar(20)", nullable = false)
	private String authority;


	
	
	
}
