package main.controllers;

import java.io.IOException;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import main.dto.BlogDTO;
import main.dto.LastThreeDTO;
import main.dto.MainPageBlogDTO;
import main.dto.SingleBlogDTO;
import main.entity.Blog;
import main.exceptions.TagException;
import main.service.BlogService;

@RestController
@RequestMapping("/api/blogs")
public class BlogController {

	private BlogService blogService;

	public BlogController(BlogService blogService) {
		this.blogService = blogService;
	}	
	

	
	
	@GetMapping
	public ResponseEntity<Page<MainPageBlogDTO>> findAllBlogsHandler(@RequestParam(name="page", defaultValue="1") Integer page, 
														  @RequestParam(name="category", required=false) String categoryName , 
														  @RequestParam(name="tag", required = false) String tagName,
														  @RequestParam(name="query", required = false) String query,
														  @RequestParam(name="userId", required = false) Integer userId){
		return ResponseEntity.status(HttpStatus.OK).body(blogService.findBlogs(page, categoryName, tagName, query, userId));
	}
	
	@GetMapping("/threeNewest")
	public ResponseEntity<Page<LastThreeDTO>> findThreeNewest(){
		return ResponseEntity.status(HttpStatus.OK).body(blogService.find3Newest());
	}
	
	@GetMapping("/lastThreeImportant")
	public ResponseEntity<List<MainPageBlogDTO>> getLastThreeImportant(){
		return ResponseEntity.status(HttpStatus.OK).body(blogService.findLastThreeImportant());
	}
	
	@GetMapping("/newest")
	public ResponseEntity<List<MainPageBlogDTO>> findNewestHandler(){
		return ResponseEntity.status(HttpStatus.OK).body(blogService.find12Newest());
	}
	
	@GetMapping("/allBlogs")
	public ResponseEntity<Page<BlogDTO>> findAllBlogsDtoHandler(@RequestParam(name="page", defaultValue="1") int page, @RequestParam(name="filterBy", required=false) String filterBy){
		
		return ResponseEntity.status(HttpStatus.OK).body(blogService.findBlogsInfo(page, filterBy));
	}
	
	@GetMapping("/{blogId}")
	public ResponseEntity<SingleBlogDTO> findBlogByIdHandler(@PathVariable int blogId){
		
		return ResponseEntity.status(HttpStatus.OK).body(blogService.findSingleBlog(blogId));
	}
	
	@PostMapping
	public ResponseEntity<Blog> createBlogHandler(@RequestParam(required=false) Integer categoryId ,
												  @RequestParam(name="title") String title, 
												  @RequestParam(name="description") String description ,
												  @RequestParam(name="contentBody") String contentBody,
												  @RequestParam(name="userId", required = false) Integer userId,
												  @RequestParam(name="blogId", required = false) Integer blogId,
												  @RequestParam(name="image", required = false) MultipartFile image,
												  @RequestParam(name="tagsId", required = false) List<Integer> tagsId) throws IOException, TagException{
		return ResponseEntity.status(HttpStatus.OK).body(blogService.createBlog(categoryId, title, description, contentBody,image, blogId, userId, tagsId));
		
	}

	
	@DeleteMapping("/{blogId}")
	public ResponseEntity<Boolean> deleteBlogHandler(@PathVariable int blogId){
		
		return ResponseEntity.status(HttpStatus.OK).body(blogService.deleteBlog(blogId));
	}

	
	@PostMapping("/important/{blogId}")
	public ResponseEntity<Boolean> importantBlogHandler(@PathVariable int blogId){
		return ResponseEntity.status(HttpStatus.OK).body(blogService.makeImportant(blogId));
	}
	
	@PostMapping("/unimportant/{blogId}")
	public ResponseEntity<Boolean> unImportantBlogHandler(@PathVariable int blogId){
		
		return ResponseEntity.status(HttpStatus.OK).body(blogService.makeUnImportant(blogId));
	}
	
	@PostMapping("/enable/{blogId}")
	public ResponseEntity<Boolean> enableBlogHandler(@PathVariable int blogId){
		return ResponseEntity.status(HttpStatus.OK).body(blogService.enableBlog(blogId));
	}
	
	@PostMapping("/disable/{blogId}")
	public ResponseEntity<Boolean> disableBlogHandler(@PathVariable int blogId){
		
		return ResponseEntity.status(HttpStatus.OK).body(blogService.disableBlog(blogId));
	}
}
