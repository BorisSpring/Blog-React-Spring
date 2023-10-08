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

import main.entity.Message;
import main.exceptions.MessageException;
import main.service.MessageService;

@RestController
@RequestMapping("/api/messages")
public class MessageController {
	
	public MessageService msgService;
	
	
	
	public MessageController(MessageService msgService) {
		this.msgService = msgService;
	}

	@PostMapping("/readed/{msgId}")
	public ResponseEntity<Boolean> setAsReadedHandler(@PathVariable int msgId) throws MessageException{
		
		return ResponseEntity.status(HttpStatus.OK).body(msgService.setReaded(msgId));
	}
	
	@PostMapping("/unread/{msgId}")
	public ResponseEntity<Boolean> setAsUnReadedHandler(@PathVariable int msgId) throws MessageException{
		
		return ResponseEntity.status(HttpStatus.OK).body(msgService.setUnRead(msgId));
	}

	@DeleteMapping("/{msgId}")
	public  ResponseEntity<Boolean> deleteMessageHandler(@PathVariable int msgId) throws MessageException{
		
		return ResponseEntity.status(HttpStatus.OK).body(msgService.deleteMessage(msgId));
	}
	
	@PostMapping("")
	public ResponseEntity<Message> sendMessageHandler(@RequestBody Message msg) throws MessageException{
		
		return ResponseEntity.status(HttpStatus.CREATED).body(msgService.sendMessage(msg));
	}
	
	@GetMapping
	public ResponseEntity<Page<Message>> findMessagesHandler(@RequestParam(name="page" ,defaultValue = "1") int page, @RequestParam(required = false) String filterBy){
	
		return ResponseEntity.status(HttpStatus.OK).body(msgService.findMessages(page, filterBy));
	}
}
