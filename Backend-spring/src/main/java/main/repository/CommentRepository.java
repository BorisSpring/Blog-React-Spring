package main.repository;


import main.model.CommentPageList;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import main.domain.Comment;
import java.util.UUID;

@Repository
public interface CommentRepository extends JpaRepository<Comment, UUID>{


	@Query("SELECT c FROM Comment c " +
			"LEFT JOIN c.blog b " +
			"WHERE (:status IS NULL OR c.enabled=:status) " +
			"AND (:blogId IS NULL OR b.id =:blogId)")
	Page<Comment> findAll(PageRequest pageable, @Param("status")Boolean status, UUID blogId);
}
