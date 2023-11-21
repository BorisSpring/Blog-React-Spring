package main.service;

import java.util.UUID;
import lombok.RequiredArgsConstructor;
import main.model.CommentPageList;
import main.requests.CreateCommentRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;
import main.domain.Blog;
import main.domain.Comment;
import main.exceptions.CommentException;
import main.repository.CommentRepository;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {

	private final CommentRepository commentRepo;
	private final BlogService blogService;


	@Transactional
	@Override
	public Comment addComment(UUID blogId, CreateCommentRequest request) throws CommentException {
			
		Blog blog = blogService.findById(blogId);
		Comment comment = Comment.builder()
				.blog(blog)
				.enabled(true)
				.content(request.getContent())
				.name(request.getName())
				.email(request.getEmail())
				.build();

		comment = commentRepo.save(comment);
		
		if(comment  == null)
			throw new CommentException("Failed to add comment");

		return comment;
	}

	@Transactional
	@Override
	public void disableComment(UUID commentId) throws CommentException {
		
		Comment comment = findById(commentId);

		if(comment.isEnabled()){
			comment.setEnabled(false);
		    comment =  commentRepo.save(comment);

			if(comment == null) throw new CommentException("Fail to disable comment");
		}
	}

	@Transactional
	@Override
	public void enableComment(UUID commentId) throws CommentException {
		
		Comment comment = findById(commentId);

		if(!comment.isEnabled()){
			comment.setEnabled(true);
			comment = commentRepo.saveAndFlush(comment);

			if(comment == null) throw new CommentException("Fail to disable comment");
		}
	}

	@Transactional
	@Override
	public void deleteComment(UUID commentId) throws CommentException {
		 
		if(!commentRepo.existsById(commentId))
			throw new CommentException("Comment with id " + commentId + " doesnt exists");

		commentRepo.deleteById(commentId);
	}

	@Override
	public CommentPageList findComments(int pageNumber, String status, UUID blogId) {
		Boolean commentStatus = null;

		if(status != null)
			 commentStatus = status.equals("disabled") ? false : true;

		PageRequest pageable = PageRequest.of(pageNumber > 0 ? (pageNumber- 1) : 0, 12);
		Page<Comment> commentPage = commentRepo.findAll(pageable, commentStatus, blogId);

		return new CommentPageList(commentPage.getContent(), pageable, commentPage.getTotalElements());
	}


	@Override
	public Comment findById(UUID commentId) throws CommentException {
		return  commentRepo.findById(commentId).orElseThrow(() -> new CommentException("Comment with id " + commentId + " doesnt exists!"));
	}

}
