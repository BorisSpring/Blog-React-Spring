package main.repository;

import main.model.UserPageList;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import main.domain.User;

import java.util.UUID;

@Repository
public interface UserRepository  extends JpaRepository<User, UUID>{

	
	boolean existsByEmail(String email);
	
	User findByEmail(String email);

	@Query("SELECT u FROM User u"
			+ " WHERE (:filter IS NULL or u.enabled =:filter) ")
	Page<User> findAll(Boolean filter, PageRequest pageable);
}



