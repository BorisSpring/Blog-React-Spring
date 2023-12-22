package main.repository;

import java.util.List;
import java.util.UUID;
import main.model.MainPageBlogDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import main.model.BlogDTO;
import main.model.PrevNextBlog;
import main.domain.Blog;

@Repository
public interface BlogRepository extends JpaRepository<Blog, UUID>{


	@Query("SELECT MAX(b.important) FROM Blog b ")
	Integer selectMaxImportant();
	
	List<Blog> findTop3ByImportantIsNotNullAndEnabledIsTrueOrderByImportantDesc();

	List<Blog> findTop12ByOrderByCreatedDateDesc();

	@Query("SELECT new main.model.BlogDTO(b.id, b.enabled, b.title, b.important, c.name) FROM Blog b LEFT JOIN b.category c WHERE"
			+ " (:filterBy IS NULL OR  (:filterBy = 'enabled' AND b.enabled=true) OR "
			+ " (:filterBy IS NULL OR :filterBy = 'disabled' AND b.enabled=false) OR "
			+ " (:filterBy IS NULL OR :filterBy = 'important' AND b.important > 0) OR "
			+ " (:filterBy IS NULL OR :filterBy = 'unimportant' AND b.important IS NULL OR b.important = 0)) ")
	Page<BlogDTO> findBlogsInfo(PageRequest pageable, @Param("filterBy") String filterBy);

	@Query("SELECT NEW main.model.MainPageBlogDTO(c.name, b.title, b.description , u.id, b.id ,b.createdDate, COUNT(ci.id), u.firstName, u.lastName, b.image , u.image) FROM Blog b " +
			"  LEFT JOIN  b.category c " +
			"  LEFT JOIN b.tags t " +
			"  LEFT JOIN b.user u " +
			"  LEFT JOIN b.comments ci WHERE"
			+ " (:categoryName IS NULL OR c.name =:categoryName) AND"
			+ " (:tagName IS NULL OR :tagName IN (SELECT tag.name from b.tags tag)) AND "
			+ " (:userId IS NULL OR u.id =:userId ) AND"
			+ "(:query IS NULL OR b.title LIKE %:query% OR b.description LIKE %:query% OR b.contentBody LIKE %:query% OR u.firstName LIKE %:query% OR u.lastName LIKE %:query%) AND b.enabled = true GROUP BY c.name , b.title, b.description , u.firstName , u.id , b.id, b.createdDate  ")
	Page<MainPageBlogDTO> findBlogs(PageRequest pageable,@Param("categoryName") String categoryName, String tagName, String query, UUID userId);

	@Query("SELECT new main.model.PrevNextBlog(b.id , b.title) FROM Blog b WHERE b.id < :blogId ORDER BY b.id DESC")
	PrevNextBlog findPrev(@Param("blogId")UUID blogId, PageRequest pageable);
	
	@Query("SELECT NEW main.model.PrevNextBlog(b.id, b.title) FROM Blog b WHERE b.id > :blogId ORDER BY b.id ASC")
	PrevNextBlog findNext(@Param("blogId") UUID blogId , PageRequest pageable);

}
