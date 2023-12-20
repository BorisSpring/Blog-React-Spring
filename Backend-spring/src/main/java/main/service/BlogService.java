package main.service;

import java.io.IOException;
import java.util.List;
import java.util.UUID;
import main.exceptions.CategoryException;
import main.requests.CreateBlogRequest;
import org.springframework.data.domain.Page;
import main.model.BlogDTO;
import main.model.LastThreeDTO;
import main.model.MainPageBlogDTO;
import main.model.SingleBlogDTO;
import main.domain.Blog;

public interface BlogService {

	 SingleBlogDTO findSingleBlog(UUID blogId);
	
	 Page<MainPageBlogDTO>  findBlogs(int pageNumber, String categoryName, String tagName, String query, UUID userId);
	
	 List<MainPageBlogDTO> find12Newest();
	
	 List<MainPageBlogDTO> findLastThreeImportant();
	
	 List<LastThreeDTO> find3Newest();

	 Blog findById(UUID blogId);
	
	 void makeImportant(UUID blogId);
	
	 void makeUnImportant(UUID blogId);
	
	 void deleteBlog(UUID blogId);
	
	 void enableBlog(UUID blogId);
	
	 void disableBlog(UUID blogId);

	 Page<BlogDTO> findBlogsInfo(int page, String filterBy);

     Blog craeteBlog(CreateBlogRequest createBlogRequest) throws CategoryException, IOException;
}
