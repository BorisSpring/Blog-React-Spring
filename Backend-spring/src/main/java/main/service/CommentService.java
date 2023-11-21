package main.service;


import main.model.CommentPageList;
import main.domain.Comment;
import main.exceptions.CommentException;
import main.requests.CreateCommentRequest;

import java.util.UUID;

public interface CommentService {

	 Comment addComment(UUID blogId, CreateCommentRequest request) throws CommentException;
	
	 void disableComment(UUID commentId) throws CommentException;
	
	 void enableComment(UUID commentId) throws CommentException;
	
	 void deleteComment(UUID commentId) throws CommentException;
	
	 Comment findById(UUID commentId) throws CommentException;

	CommentPageList findComments(int pageNumber, String status, UUID blogId);
}
