package main.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import main.entity.Tag;
import main.exceptions.TagException;
import main.service.TagService;

@RestController
@RequestMapping("/api/tags")
public class TagController {

	private TagService tagService;

	public TagController(TagService tagService) {
		this.tagService = tagService;
	}
	
	@PostMapping
	public ResponseEntity<Tag> addTag(@RequestBody Tag tag) throws TagException{
		
		return ResponseEntity.status(HttpStatus.OK).body(tagService.addTag(tag));
	}	
	
	@PostMapping("/{tagId}/{tagName}")
	public ResponseEntity<Boolean> updateTag(@PathVariable String tagName, @PathVariable Integer tagId) throws TagException{
			
		return ResponseEntity.status(HttpStatus.OK).body(tagService.updateTag(tagId, tagName));
	}
	
	@DeleteMapping("/{blogId}")
	public ResponseEntity<Boolean> deleteTag(@PathVariable int blogId) throws TagException{
		
		return ResponseEntity.status(HttpStatus.OK).body(tagService.deleteTag(blogId));
		
	}
	
	@GetMapping
	public ResponseEntity<List<Tag>> findAllTags(){
		return ResponseEntity.status(HttpStatus.OK).body(tagService.findAll());
	}
}
