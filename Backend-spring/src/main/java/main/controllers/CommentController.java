package main.controllers;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import main.requests.CreateCommentRequest;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import main.domain.Comment;
import main.exceptions.CommentException;
import main.service.CommentService;
import java.util.UUID;

@RestController
@RequestMapping("/api/comments")
@RequiredArgsConstructor
public class CommentController {

	private final CommentService commentService;

	@DeleteMapping("/{commentId}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deleteCommentHandler(@PathVariable(name = "commentId") UUID commentId) throws CommentException{
		commentService.deleteComment(commentId);
	}
	
	@PostMapping("/{blogId}")
	public ResponseEntity<Comment> addCommentHandler(@PathVariable(name = "blogId") UUID blogId,
													 @Valid @RequestBody CreateCommentRequest request) throws CommentException{
		return ResponseEntity.status(HttpStatus.OK).body(commentService.addComment(blogId, request));
	}

	@PutMapping("/disable/{blogId}")
	@ResponseStatus(HttpStatus.OK)
	public void disableCommentHandler(@PathVariable(name = "blogId") UUID blogId) throws CommentException{
		commentService.disableComment(blogId);
	}
	
	@PutMapping("/enable/{blogId}")
	public void enableCommentHandler(@PathVariable(name = "blogId") UUID blogId) throws CommentException{
		commentService.enableComment(blogId);
	}

	@GetMapping
	public ResponseEntity<Page<Comment>> findAllCommentsHandler(@RequestParam(name="page", defaultValue="1") Integer page,
																@RequestParam(name="filterBy", required= false) String filterBy,
																@RequestParam( name = "blogId", required= false) UUID blogId){
		return ResponseEntity.status(HttpStatus.OK).body(commentService.findComments(page, filterBy, blogId));
	}
}
