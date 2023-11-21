package main.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import main.exceptions.CategoryException;
import main.mappers.BlogMapper;
import main.requests.CreateBlogRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;
import main.model.BlogDTO;
import main.model.LastThreeDTO;
import main.model.MainPageBlogDTO;
import main.model.SingleBlogDTO;
import main.domain.Blog;
import main.domain.Category;
import main.domain.Tag;
import main.exceptions.BlogException;
import main.exceptions.TagException;
import main.repository.BlogRepository;
import main.repository.CategoryRepository;

@Service
@RequiredArgsConstructor
@Getter
public class BlogServiceImpl implements BlogService {

	private final BlogRepository blogRepo;
	private final CategoryRepository categoryRepo;
	private final UserService userService;
	private final TagService tagService;
	private final BlogMapper blogMapper;
	@Value("${upload.dir}")
	private String uploadDir;


	@Transactional
	@Override
	public void deleteBlog(UUID blogId) {
		if(!blogRepo.existsById(blogId))
			throw new BlogException("Blog with id " + blogId + " not found");

		blogRepo.deleteById(blogId);
	}

	@Transactional
	@Override
	public void enableBlog(UUID blogId) {
	   
		Blog blog = findById(blogId);

		if(!blog.isEnabled()){
			blog.setEnabled(true);
			Blog updatedBlog = blogRepo.save(blog);

			if(updatedBlog == null)
				throw new BlogException("Fail to enable blog");
		}
	}

	@Transactional
	@Override
	public void disableBlog(UUID blogId) {

		Blog blog = findById(blogId);

		if(blog.isEnabled()){
			blog.setEnabled(false);
			Blog updatedBlog = blogRepo.save(blog);

			if(updatedBlog == null)
				throw new BlogException("Fail to enable blog");
		}
	}


	@Override
	public Page<MainPageBlogDTO>  findBlogs(int pageNumber, String categoryName, String tagName, String query, UUID userId) {
		PageRequest pageable = PageRequest.of(pageNumber > 0 ? (pageNumber - 1) : 0, 4);
		return blogRepo.findBlogs(pageable, categoryName, tagName, query, userId);
	}

	@Transactional
	@Override
	public void makeImportant(UUID blogId) {
       
		Blog blog = findById(blogId);
		
		Integer maxImportant = blogRepo.selectMaxImportant();
		
		blog.setImportant(maxImportant == null ? 1 : maxImportant + 1);
		
		Blog updatedBlog = blogRepo.save(blog);
		
		if(updatedBlog == null) 
			throw new BlogException("Fail to update blog");

	}

	@Transactional
	@Override
	public void makeUnImportant(UUID blogId) {

		Blog blog = findById(blogId);

		if (blog.getImportant() != null) {
			blog.setImportant(null);

			Blog updatedBlog = blogRepo.save(blog);

			if (updatedBlog == null)
				throw new BlogException("Fail to update blog");
		}
	}

	@Override
	public SingleBlogDTO findSingleBlog(UUID blogId) {
		Blog blog = findById(blogId);
		blog.setViews(blog.getViews() == null ? 1 : blog.getViews() + 1);
		blogRepo.saveAndFlush(blog);
		blog.getComments().removeIf(c -> c.isEnabled() == false);

		return  blogMapper.blogToSingleBlogDto(blog);
	}

	@Override
	public Blog findById(UUID blogId) {
		return  blogRepo.findById(blogId).orElseThrow(() ->  new BlogException("Blog with id " + blogId + " doesnt exists"));
	}

	@Override
	public List<MainPageBlogDTO> find12Newest() {
		return  blogRepo.findTop12ByOrderByCreatedDateDesc()
				.stream()
				.map(blogMapper::blogToMainPageBlogDto)
				.collect(Collectors.toList());
	}

	
	@Override
	public List<MainPageBlogDTO> findLastThreeImportant() {
		return blogRepo.findTop3ByImportantIsNotNullOrderByImportantDesc()
				.stream()
				.map(blogMapper::blogToMainPageBlogDto)
				.collect(Collectors.toList());
	}
	
	@Override
	public Page<BlogDTO> findBlogsInfo(int page, String filterBy) {
		PageRequest pageable = PageRequest.of((page - 1), 15);
		return blogRepo.findBlogsInfo(pageable, filterBy);
	}

	@Transactional
	@Override
	public Blog craeteBlog(CreateBlogRequest request) throws CategoryException, IOException {
		Blog blog = null;
		Category category = null;
		String imageName = null;

		if(request.getBlogId() != null){
			blog = findById(request.getBlogId());
		}else{
			blog = new Blog();
		}

		if(request.getBlogId() == null && request.getImage() == null){
			throw new BlogException("Image is required!");
		}

		if(request.getCategoryId() != null) {
			category = categoryRepo.findById(request.getCategoryId()).orElseThrow(() -> new CategoryException("Category with id " + request.getCategoryId() + " doesnt exist"));
			blog.setCategory(category);
		}

		if(request.getUserId() == null){
			blog.setUser(userService.findByUserId(request.getUserId()));
		}
		blog.setDescription(request.getDescription());
		blog.setContentBody(request.getContentBody());
		blog.setTitle(request.getTitle());

		if(request.getTagsId() != null && request.getTagsId().isEmpty()){
			List<Tag> tags = new ArrayList<>();
			request.getTagsId().forEach(uuid -> {
				try {
					tags.add(tagService.findById(uuid));
				} catch (TagException e) {
					throw new RuntimeException(e);
				}
			});
			blog.setTags(tags);
		}

		Path path = Paths.get(uploadDir);

		if(!Files.exists(path))
			Files.createDirectories(path);

		if(request.getImage() != null){
			imageName = UUID.randomUUID().toString() + request.getImage().getOriginalFilename();
			Files.copy(request.getImage().getInputStream(), path.resolve(imageName), StandardCopyOption.REPLACE_EXISTING);
			blog.setImage(imageName);
		}

		Blog savedBlog = blogRepo.saveAndFlush(blog);

		if(savedBlog == null)
			throw new BlogException(request.getBlogId() == null ? "Fail to create blog" : "Fail to update blog");

		return savedBlog;
	}


	@Override
	public List<LastThreeDTO> find3Newest() {
		return  blogRepo.findTop3ByImportantIsNotNullOrderByImportantDesc()
				.stream()
				.map(blogMapper::blogToNewestThreeDto)
				.collect(Collectors.toList());
	}

}
