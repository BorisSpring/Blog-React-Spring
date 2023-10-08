package main.service;


import org.springframework.data.domain.Page;

import main.entity.Comment;
import main.exceptions.CommentException;

public interface CommentService {

	public Comment addComment(int blogId, Comment comment) throws CommentException;
	
	public boolean disableComment(int commentId) throws CommentException;
	
	public boolean enableComment(int commentId) throws CommentException;
	
	public boolean deleteComment(int commentId) throws CommentException;	
	
	public Comment findById(int commentId) throws CommentException;

	Page<Comment> findComments(int pageNumber, String status, Integer blogId);
}
