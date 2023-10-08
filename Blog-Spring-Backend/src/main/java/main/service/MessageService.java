package main.service;

import org.springframework.data.domain.Page;

import main.entity.Message;
import main.exceptions.MessageException;

public interface MessageService {

	
	public Message sendMessage(Message msg) throws MessageException;
	
	public boolean deleteMessage(int msgId) throws MessageException;
	
	public boolean setReaded(int msgId) throws MessageException;
	
	public boolean setUnRead(int msgId) throws MessageException;
	
	public Message findById(int msgId) throws MessageException;
	
	public Page<Message> findMessages(int page, String filterBy);
}
