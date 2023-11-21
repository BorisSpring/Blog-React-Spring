package main.controllers;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import main.model.MessagePageList;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import main.domain.Message;
import main.exceptions.MessageException;
import main.service.MessageService;
import java.util.UUID;

@RestController
@RequestMapping("/api/messages")
@RequiredArgsConstructor
public class MessageController {
	
	public final MessageService msgService;

	@PutMapping("/readed/{msgId}")
	@ResponseStatus(HttpStatus.OK)
	public void setAsReadedHandler(@PathVariable(name = "msgId") UUID msgId) throws MessageException{
	  msgService.setReaded(msgId);
	}
	
	@PutMapping("/unread/{msgId}")
	@ResponseStatus(HttpStatus.OK)
	public void setAsUnReadedHandler(@PathVariable(name = "msgId") UUID msgId) throws MessageException{
		msgService.setUnRead(msgId);
	}

	@DeleteMapping("/{msgId}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deleteMessageHandler(@PathVariable(name = "msgId") UUID msgId) throws MessageException{
		msgService.deleteMessage(msgId);
	}
	
	@PostMapping
	public ResponseEntity<Message> sendMessageHandler(@Valid @RequestBody Message msg) throws MessageException{
		return ResponseEntity.status(HttpStatus.CREATED).body(msgService.sendMessage(msg));
	}
	
	@GetMapping
	public ResponseEntity<MessagePageList> findMessagesHandler(@RequestParam(name="page" ,defaultValue = "1") int page,
															   @RequestParam(required = false) String filterBy){
		return ResponseEntity.status(HttpStatus.OK).body(msgService.findMessages(page, filterBy));
	}
}
