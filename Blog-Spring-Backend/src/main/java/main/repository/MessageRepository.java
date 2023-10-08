package main.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import main.entity.Message;

@Repository
public interface MessageRepository extends JpaRepository<Message, Integer>{

	@Query("SELECT m FROM Message m WHERE "
			+ "(:filterValue IS NULL OR m.readed =:filterValue) ")
	Page<Message> findAll(@Param("filterValue")Boolean filterValue, PageRequest pageable);

}
