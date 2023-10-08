package main.service;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import main.entity.Message;
import main.exceptions.MessageException;
import main.repository.MessageRepository;

@Service
public class MessageServiceImpl implements MessageService {

	private MessageRepository messageRepo;
	
	
	public MessageServiceImpl(MessageRepository messageRepo) {
		this.messageRepo = messageRepo;
	}

	@Override
	public Message sendMessage(Message msg) throws MessageException {
		
		msg.setCreatedAt(LocalDateTime.now());
		Message savedMessage = messageRepo.save(msg);
	
		if(savedMessage == null) 
			throw new MessageException("Fail to sendMessage");
		
		
		return savedMessage;
	}

	@Override
	public boolean deleteMessage(int msgId) throws MessageException {
	
		if(messageRepo.existsById(msgId)) {
		
			messageRepo.deleteById(msgId);
			return true;
			
		}
		
		throw new MessageException("Message with id " + msgId  + " doesnt exists!");
		
	}

	@Override
	public boolean setReaded(int msgId) throws MessageException {
		
		Message msg = findById(msgId);
		
		msg.setReaded(true);
		Message updatedMessage = messageRepo.save(msg);
		
		if(updatedMessage == null) 
			throw new MessageException("Fail to update message status");
		
		
		return true;		
	}

	@Override
	public boolean setUnRead(int msgId) throws MessageException {
		
		Message msg = findById(msgId);
		
		msg.setReaded(false);
		Message updatedMessage = messageRepo.save(msg);
		
		if(updatedMessage == null) {
			throw new MessageException("Fail to update message status");
		}
		return true;
	}

	@Override
	public Message findById(int msgId) throws MessageException {
		
		Optional<Message> opt = messageRepo.findById(msgId);
		
		if(opt.isPresent()) {
			return opt.get();
		}
		
		throw new MessageException("Message with id" + msgId + " doesnt exists");
		
	}

	

	@Override
	public Page<Message> findMessages(int page, String filterBy) {
	
		Boolean filterValue = null;
		
		
		if(filterBy == null) {
			filterValue =  null;	
		}else if(filterBy.equals("readed")) {
			filterValue = true;
		}else if (filterBy.equals("unread")) {
			filterValue = false;
		}
		
		PageRequest pageable = PageRequest.of((page-1), 12);
		Page<Message> messages = messageRepo.findAll(filterValue, pageable);
		
		return messages;

	}

	

}
