package main.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import main.dto.BlogDTO;
import main.dto.LastThreeDTO;
import main.dto.MainPageBlogDTO;
import main.dto.PrevNextBlog;
import main.entity.Blog;

@Repository
public interface BlogRepository extends JpaRepository<Blog, Integer>{

	
	@Query("SELECT MAX(b.important) FROM Blog b ")
	Integer selectMaxImportant();

	@Query(value = "SELECT  * FROM blog  WHERE important > 0  AND enabled = true  ORDER BY important DESC LIMIT 3" , nativeQuery= true)
	List<Blog> findLastThreeImportant();

	@Query("SELECT NEW main.dto.MainPageBlogDTO (c.name, b.title, b.description , u.id, b.id ,b.created, COUNT(ci.id), u.firstName, u.lastName, b.image , u.image)"
			+ "  FROM Blog b  "
			+ "  JOIN b.category c"
			+ "  LEFT JOIN b.tags t "
			+ "  LEFT JOIN b.user u LEFT JOIN b.comments ci "
			+ "  WHERE b.enabled = true  "
			+ "  GROUP BY c.name, b.title, b.description, u.id, b.id, b.created, u.firstName, u.lastName, b.image, u.image "
			+ "  ORDER BY b.created DESC")
	List<MainPageBlogDTO> find12Newest(PageRequest pageable);

	@Query("SELECT new main.dto.BlogDTO(b.id, b.enabled, b.title, b.important, c.name) FROM Blog b LEFT JOIN b.category c WHERE"
			+ " (:filterBy IS NULL OR  (:filterBy = 'enabled' AND b.enabled=true) OR "
			+ " (:filterBy IS NULL OR :filterBy = 'disabled' AND b.enabled=false) OR "
			+ " (:filterBy IS NULL OR :filterBy = 'important' AND b.important > 0) OR "
			+ " (:filterBy IS NULL OR :filterBy = 'unimportant' AND b.important IS NULL OR b.important = 0)) ")
	Page<BlogDTO> findBlogsInfo(PageRequest pageable, @Param("filterBy") String filterBy);
	

	@Query("SELECT b FROM Blog b JOIN b.user u WHERE  b.title LIKE %:query% OR b.description LIKE %:query% OR b.contentBody LIKE %:query% OR u.firstName LIKE %:query% OR u.lastName LIKE %:query% ")
	Page<Blog> findByQuery(String query, PageRequest pageable);

	
	@Query("SELECT NEW main.dto.MainPageBlogDTO(c.name, b.title, b.description , u.id, b.id ,b.created, COUNT(ci.id), u.firstName, u.lastName, b.image , u.image) FROM Blog b   JOIN b.category c LEFT JOIN b.tags t LEFT JOIN b.user u LEFT JOIN b.comments ci WHERE"
			+ " (:categoryName IS NULL OR c.name =:categoryName) AND"
			+ " (:tagName IS NULL OR :tagName IN (SELECT name from b.tags)) AND "
			+ " (:userId IS NULL OR u.id =:userId ) AND"
			+ "(:query IS NULL OR b.title LIKE %:query% OR b.description LIKE %:query% OR b.contentBody LIKE %:query% OR u.firstName LIKE %:query% OR u.lastName LIKE %:query%) AND b.enabled = true GROUP BY c.name , b.title, b.description , u.firstName , u.id , b.id, b.created  ")
	Page<MainPageBlogDTO> findBlogs(PageRequest pageable,@Param("categoryName") String categoryName, String tagName, String query, Integer userId);

	
	@Query("SELECT NEW main.dto.LastThreeDTO(b.id, b.title, b.image, b.created, COUNT(c.id), b.views) FROM Blog b LEFT JOIN b.comments c WHERE b.enabled = true GROUP BY b.id ORDER BY b.created DESC")
	Page<LastThreeDTO> findLastThreeEnabledBlogs(PageRequest pageable);
	

	@Query("SELECT new main.dto.PrevNextBlog(b.id , b.title) FROM Blog b WHERE b.id < :blogId ORDER BY b.id DESC")
	PrevNextBlog findPrev(@Param("blogId")int blogId, PageRequest pageable);
	
	@Query("SELECT NEW main.dto.PrevNextBlog(b.id, b.title) FROM Blog b WHERE b.id > :blogId ORDER BY b.id ASC")
	PrevNextBlog findNext(@Param("blogId") int blogId , PageRequest pageable);
}
