package main.repository;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import main.entity.Comment;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Integer>{


	@Query("SELECT c FROM Comment c LEFT JOIN c.blog b WHERE (:status IS NULL OR c.enabled=:status) AND (:blogId IS NULL OR b.id =:blogId)")
	Page<Comment> findAll(PageRequest pageable, @Param("status")Boolean status, Integer blogId);
}
