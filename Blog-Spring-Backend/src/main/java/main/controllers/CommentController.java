package main.controllers;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import main.entity.Comment;
import main.exceptions.CommentException;
import main.service.CommentService;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

	private CommentService commentService;
	
	
	
	public CommentController(CommentService commentService) {
		this.commentService = commentService;
	}


	@DeleteMapping("/{blogId}")
	public ResponseEntity<Boolean> deleteCommentHandler(@PathVariable Integer blogId) throws CommentException{
		
		return ResponseEntity.status(HttpStatus.OK).body(commentService.deleteComment(blogId));
	}
	
	@PostMapping("/{blogId}")
	public ResponseEntity<Comment> addCommentHandler(@PathVariable Integer blogId, @RequestBody Comment comment) throws CommentException{
		
		return ResponseEntity.status(HttpStatus.OK).body(commentService.addComment(blogId, comment));
	}

	@PostMapping("/disable/{blogId}")
	public ResponseEntity<Boolean> disableCommentHandler(@PathVariable Integer blogId) throws CommentException{
		
		return ResponseEntity.status(HttpStatus.OK).body(commentService.disableComment(blogId));
	}
	
	@PostMapping("/enable/{blogId}")
	public ResponseEntity<Boolean> enableCommentHandler(@PathVariable Integer blogId) throws CommentException{
		
		return ResponseEntity.status(HttpStatus.OK).body(commentService.enableComment(blogId));
	}

	@GetMapping
	public ResponseEntity<Page<Comment>> findAllCommentsHandler(@RequestParam(name="page", defaultValue="1") Integer page, @RequestParam(name="filterBy", required= false) String filterBy, @RequestParam( name = "blogId", required= false) Integer blogId){
		
		return ResponseEntity.status(HttpStatus.OK).body(commentService.findComments(page, filterBy, blogId));
	}
}
