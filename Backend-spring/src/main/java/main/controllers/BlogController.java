package main.controllers;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import main.exceptions.CategoryException;
import main.requests.CreateBlogRequest;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import main.model.BlogDTO;
import main.model.LastThreeDTO;
import main.model.MainPageBlogDTO;
import main.model.SingleBlogDTO;
import main.domain.Blog;
import main.service.BlogService;

@RestController
@RequestMapping("/api/blogs")
@RequiredArgsConstructor
public class BlogController {

	private final BlogService blogService;

	@GetMapping
	public ResponseEntity<Page<MainPageBlogDTO> > findAllBlogsHandler(@RequestParam(name="page", defaultValue="1") Integer page,
														  @RequestParam(name="category", required=false) String categoryName , 
														  @RequestParam(name="tag", required = false) String tagName,
														  @RequestParam(name="query", required = false) String query,
														  @RequestParam(name="userId", required = false) UUID userId){
		return ResponseEntity.status(HttpStatus.OK).body(blogService.findBlogs(page, categoryName, tagName, query, userId));
	}
	
	@GetMapping("/threeNewest")
	public ResponseEntity<List<LastThreeDTO>> findThreeNewest(){
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
	public ResponseEntity<Page<BlogDTO>> findAllBlogsDtoHandler(@RequestParam(name="page", defaultValue="1") int page,
																@RequestParam(name="filterBy", required=false) String filterBy){
		
		return ResponseEntity.status(HttpStatus.OK).body(blogService.findBlogsInfo(page, filterBy));
	}
	
	@GetMapping("/{blogId}")
	public ResponseEntity<SingleBlogDTO> findBlogByIdHandler(@PathVariable(name = "blogId") UUID blogId){
		
		return ResponseEntity.status(HttpStatus.OK).body(blogService.findSingleBlog(blogId));
	}

	@PostMapping
	public ResponseEntity<Blog> createBlogHandler(@Valid @ModelAttribute CreateBlogRequest createBlogRequest) throws CategoryException, IOException {
		System.out.println("request");
		System.out.println(createBlogRequest.toString());
		return ResponseEntity.status(HttpStatus.CREATED).body(blogService.craeteBlog(createBlogRequest));
	}

	
	@DeleteMapping("/{blogId}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public  void deleteBlogHandler(@PathVariable(name = "blogId") UUID blogId){
		blogService.deleteBlog(blogId);
	}

	
	@PutMapping("/important/{blogId}")
	@ResponseStatus(HttpStatus.OK)
	public void importantBlogHandler(@PathVariable(name = "blogId") UUID blogId){
		blogService.makeImportant(blogId);
	}
	
	@PutMapping("/unimportant/{blogId}")
	@ResponseStatus(HttpStatus.OK)
	public void unImportantBlogHandler(@PathVariable(name = "blogId") UUID blogId){
		blogService.makeUnImportant(blogId);
	}
	
	@PutMapping("/enable/{blogId}")
	@ResponseStatus(HttpStatus.OK)
	public void enableBlogHandler(@PathVariable(name = "blogId") UUID blogId){
		blogService.enableBlog(blogId);
	}
	
	@PutMapping("/disable/{blogId}")
	@ResponseStatus(HttpStatus.OK)
	public void disableBlogHandler(@PathVariable(name = "blogId") UUID blogId){
		blogService.disableBlog(blogId);
	}
}
