package main.service;

import main.model.MessagePageList;
import main.domain.Message;
import main.exceptions.MessageException;
import java.util.UUID;
public interface MessageService {

	
	 Message sendMessage(Message msg) throws MessageException;
	
	 void deleteMessage(UUID msgId) throws MessageException;
	
	 void setReaded(UUID msgId) throws MessageException;
	
	 void setUnRead(UUID msgId) throws MessageException;
	
	 Message findById(UUID msgId) throws MessageException;
	
	 MessagePageList findMessages(int page, String filterBy);
}
