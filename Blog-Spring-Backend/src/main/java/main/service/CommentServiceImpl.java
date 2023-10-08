package main.service;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import main.entity.Blog;
import main.entity.Comment;
import main.exceptions.CommentException;
import main.repository.CommentRepository;

@Service
public class CommentServiceImpl implements CommentService {

	private CommentRepository commentRepo;
	private BlogService blogService;
	
	
	public CommentServiceImpl(CommentRepository commentRepo, BlogService blogService) {
		this.commentRepo = commentRepo;
		this.blogService = blogService;
	}

	@Transactional
	@Override
	public Comment addComment(int blogId, Comment comment) throws CommentException {
			
		Blog blog = blogService.findById(blogId);
		comment.setEnabled(true);
		comment.setCreatedAt(LocalDateTime.now());
		comment.setBlog(blog);
		Comment savedComment = commentRepo.save(comment);
		
		if(savedComment == null) {
			throw new CommentException("Failed to add comment");
		}
		return comment;
	}

	@Transactional
	@Override
	public boolean disableComment(int commentId) throws CommentException {
		
		Comment comment = findById(commentId);
		
		comment.setEnabled(false);
		Comment updatedComment= commentRepo.save(comment);
		
		if(updatedComment == null) {
			throw new CommentException("Fail to disable comment");
		}
		return true;
	}

	@Transactional
	@Override
	public boolean enableComment(int commentId) throws CommentException {
		
		Comment comment = findById(commentId);
		
		comment.setEnabled(true);
		Comment updatedComment= commentRepo.save(comment);
		
		if(updatedComment == null) {
			throw new CommentException("Fail to disable comment");
		}
		return true;
	}

	@Transactional
	@Override
	public boolean deleteComment(int commentId) throws CommentException {
		 
		if(commentRepo.existsById(commentId)) {
			commentRepo.deleteById(commentId);
			return true;
		}

		throw new CommentException("Comment with id " + commentId + " doesnt exists");
	
	}

	@Override
	public Page<Comment> findComments(int pageNumber, String status, Integer blogId) {
		
		Boolean commentStatus = null;
		if(status != null && status.equals("disabled")) {
			commentStatus = false;
		}else if(status != null && status.equals("enabled")) {
			commentStatus = true;
		}
		return commentRepo.findAll(PageRequest.of((pageNumber - 1), 12), commentStatus, blogId);
	}


	@Override
	public Comment findById(int commentId) throws CommentException {
		
		Optional<Comment> opt = commentRepo.findById(commentId);
		
		if(opt.isPresent()) {
			return opt.get();
		}
		
		throw new CommentException("Comment with id " + commentId + " doesnt exists!");
		
	}

}
