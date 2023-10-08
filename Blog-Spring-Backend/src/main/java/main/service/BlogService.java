package main.service;

import java.io.IOException;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import main.dto.BlogDTO;
import main.dto.LastThreeDTO;
import main.dto.MainPageBlogDTO;
import main.dto.SingleBlogDTO;
import main.entity.Blog;
import main.exceptions.TagException;

public interface BlogService {

	
	
	public SingleBlogDTO findSingleBlog(int blogId);
	
	public Page<MainPageBlogDTO> findBlogs(int pageNumber, String categoryName, String tagName, String query, Integer userId);
	
	public List<MainPageBlogDTO> find12Newest();
	
	public List<MainPageBlogDTO> findLastThreeImportant();
	
	
	public Page<LastThreeDTO> find3Newest();

	public Blog findById(int blogId);
	
	public boolean makeImportant(int blogId);
	
	public boolean makeUnImportant(int blogId);
	
	public boolean deleteBlog(int blogId);
	
	public boolean enableBlog(int blogId);
	
	public boolean disableBlog(int blogId);
	
	public Blog createBlog(Integer categoryId, String title, String description, String contentBody,
			MultipartFile image, Integer blogId, Integer userId, List<Integer> tagsIds) throws IOException, TagException;

	public Page<BlogDTO> findBlogsInfo(int page, String filterBy);

}
