package main.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import jakarta.transaction.Transactional;
import main.dto.BlogDTO;
import main.dto.LastThreeDTO;
import main.dto.MainPageBlogDTO;
import main.dto.SingleBlogDTO;
import main.entity.Blog;
import main.entity.Category;
import main.entity.Tag;
import main.exceptions.BlogException;
import main.exceptions.TagException;
import main.repository.BlogRepository;
import main.repository.CategoryRepository;

@Service
public class BlogServiceImpl implements BlogService {

	private BlogRepository blogRepo;
	private CategoryRepository categoryRepo;
	private UserService userService;
	private TagService tagService;
	
	@Value("${upload.dir}")
	private String uploadDir;


	public BlogServiceImpl(BlogRepository blogRepo, CategoryRepository categoryRepo, UserService userService,
			TagService tagService) {
		this.blogRepo = blogRepo;
		this.categoryRepo = categoryRepo;
		this.userService = userService;
		this.tagService = tagService;
	}

	@Transactional
	@Override
	public boolean deleteBlog(int blogId) {
		
		blogRepo.deleteById(blogId);
		return true;
	}

	@Transactional
	@Override
	public boolean enableBlog(int blogId) {
	   
		Blog blog = findById(blogId);
		blog.setEnabled(true);
		Blog updatedBlog = blogRepo.save(blog);
		
		if(updatedBlog == null) {
			throw new BlogException("Fail to enable blog");
		}
		return true;
	}

	@Transactional
	@Override
	public boolean disableBlog(int blogId) {
		 
		Blog blog = findById(blogId);
		
		blog.setEnabled(false);
		Blog updatedBlog = blogRepo.save(blog);
		
		if(updatedBlog == null) 
			throw new BlogException("Fail to disable blog");
		
		
		return true;
	}


	@Override
	public Page<MainPageBlogDTO> findBlogs(int pageNumber, String categoryName, String tagName, String query, Integer userId) {
		
		PageRequest pageable = PageRequest.of((pageNumber - 1), 4);
		return blogRepo.findBlogs(pageable, categoryName, tagName, query, userId);
	}

	@Transactional
	@Override
	public boolean makeImportant(int blogId) {
       
		Blog blog = findById(blogId);
		
		Integer maxImportant = blogRepo.selectMaxImportant();
		
		blog.setImportant(maxImportant == null ? 1 : maxImportant + 1);
		
		Blog updatedBlog = blogRepo.save(blog);
		
		if(updatedBlog == null) 
			throw new BlogException("Fail to update blog");
		
		return true;
	}

	@Transactional
	@Override
	public boolean makeUnImportant(int blogId) {
		
		Blog blog = findById(blogId);
		
		blog.setImportant(null);
		
		Blog updatedBlog = blogRepo.save(blog);
		
		if(updatedBlog == null) 
			throw new BlogException("Fail to update blog");
		
		
		return true;
	}

	@Override
	public SingleBlogDTO findSingleBlog(int blogId) {
		
		SingleBlogDTO dto = new SingleBlogDTO();
		PageRequest pageable = PageRequest.of(0, 1);
		Blog blog = findById(blogId);
		
		blog.setViews(blog.getViews() + 1);
		blogRepo.save(blog);
		dto.setTags(blog.getTags());
		blog.getComments().removeIf(c -> c.isEnabled() == false);
		dto.setTitle(blog.getTitle());
		dto.setImage(blog.getImage());
		dto.setDescription(blog.getDescription());
		dto.setContentBody(blog.getContentBody());
		dto.setComments(blog.getComments());
		dto.setFirstName(blog.getUser().getFirstName());
		dto.setLastName(blog.getUser().getLastName());
		dto.setUserId(blog.getUser().getId());
		dto.setUserImage(blog.getUser() == null ? null : blog.getUser().getImage());	
		dto.setViews(blog.getViews());
		dto.setCreated(blog.getCreated());
		dto.setCategory(blog.getCategory() == null ? null : blog.getCategory().getName());
		dto.setPrev(blogRepo.findPrev(blogId, pageable));
		dto.setNext(blogRepo.findNext(blogId, pageable));
		
		
		return dto;
	}

	@Override
	public Blog findById(int blogId) {
	
		Optional<Blog> opt = blogRepo.findById(blogId);
		
		if(opt.isPresent()) 
			return opt.get();
		
		
		throw new BlogException("Blog with id " + blogId + " doesnt exists");
		
	}

	@Override
	public List<MainPageBlogDTO> find12Newest() {
		PageRequest pageable = PageRequest.of(0, 12);
		return blogRepo.find12Newest(pageable);
	}

	
	@Override
	public List<MainPageBlogDTO> findLastThreeImportant() {
		
		List<MainPageBlogDTO> mainPageBlogDTOs = new ArrayList<>();
		List<Blog> findLastThreeImportant = blogRepo.findLastThreeImportant();
		
		for(Blog blog :  findLastThreeImportant) {
			MainPageBlogDTO dto = new MainPageBlogDTO();
			if(blog.getCategory() != null) {
				dto.setCategory(blog.getCategory().getName());
			}
			dto.setTitle(blog.getTitle());
			dto.setCreated(blog.getCreated());
			dto.setId(blog.getId());
			dto.setDescription(blog.getDescription());
			dto.setNumberOfComments((long) blog.getComments().size());
			dto.setUserId(blog.getUser().getId());
			dto.setFirstName(blog.getUser().getFirstName());
			dto.setLastName(blog.getUser().getLastName());
			dto.setUserImage(blog.getUser().getImage() == null ? blog.getUser().getImage() : null);
			dto.setBlogImage(blog.getImage() == null ? null : blog.getImage());
			
			mainPageBlogDTOs.add(dto);
		}
		
		return mainPageBlogDTOs;
	}

	

	
	@Override
	public Blog createBlog(Integer categoryId, String title, String description, String contentBody,
			MultipartFile image, Integer blogId, Integer userId, List<Integer> tagsIds) throws IOException, TagException {
		
		Blog blog = null;
		Category category = null;
		String imageName = null;
		
		if(blogId != null ) {
			blog = findById(blogId);
		}else {
			blog = new Blog();
		}
		Path uploadPath = Paths.get(uploadDir);

		if(blogId != null && image != null && blog.getImage() != null) {
			Files.copy(image.getInputStream(), uploadPath.resolve(blog.getImage()), StandardCopyOption.REPLACE_EXISTING);
		}else if(image != null) {
			 imageName = UUID.randomUUID().toString() + image.getOriginalFilename();
			Files.copy(image.getInputStream(), uploadPath.resolve(imageName), StandardCopyOption.REPLACE_EXISTING);			
		}
		
		ArrayList<Tag> tags = new ArrayList<>();
		if(!tagsIds.isEmpty() && tagsIds != null)
			 tagsIds.forEach(tagId  -> {
				try {
					tags.add(tagService.findById(tagId));
				} catch (TagException e) {
					
				}
			});
		
		
		
		if(categoryId != null) {
			if(categoryRepo.existsById(categoryId)) {
				category = categoryRepo.findById(categoryId).get();
			}else {
				throw new BlogException("Couldnt add selected category! it doesnt exists");
			}
		}
		blog.setTags(tags);
		blog.setTitle(title);
		blog.setDescription(description);
		blog.setContentBody(contentBody);
		blog.setCreated(LocalDateTime.now());
		
		if(blogId == null)
			blog.setUser(userService.findByUserId(userId));
		
		if(blogId == null  || (blogId != null && imageName != null)) {
			blog.setImage(imageName);
		}
			
		
		blog.setEnabled(blogId == null ? true : blog.isEnabled());
		blog.setCategory(category != null ? category : blog.getCategory());
		blog = blogRepo.save(blog);
		
		if(blog == null) {
			throw new BlogException("Fail to add new blog");
		}
		
		return blog;
	}

	
	@Override
	public Page<BlogDTO> findBlogsInfo(int page, String filterBy) {
		
		PageRequest pageable = PageRequest.of((page - 1), 15);
		return blogRepo.findBlogsInfo(pageable, filterBy);
	}



	
	@Override
	public Page<LastThreeDTO> find3Newest() {
		
		PageRequest pageable = PageRequest.of(0, 3);		
		return blogRepo.findLastThreeEnabledBlogs(pageable);

	}

}
