package main.controllers;

import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import main.domain.Tag;
import main.exceptions.TagException;
import main.service.TagService;

@RestController
@RequestMapping("/api/tags")
@RequiredArgsConstructor
public class TagController {

	private final TagService tagService;


	@PostMapping
	public ResponseEntity<Tag> addTag(@RequestBody Tag tag) throws TagException{
		return ResponseEntity.status(HttpStatus.CREATED).body(tagService.addTag(tag));
	}	
	
	@PutMapping("/{tagId}/{tagName}")
	@ResponseStatus(HttpStatus.OK)
	public void updateTag(@PathVariable(name = "tagName") String tagName,
						  @PathVariable(name = "tagId") UUID tagId) throws TagException{
		tagService.updateTag(tagId,tagName);
	}
	
	@DeleteMapping("/{tagId}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void  deleteTag(@PathVariable(name = "tagId") UUID tagId) throws TagException{
		tagService.deleteTag(tagId);
	}
	
	@GetMapping
	public ResponseEntity<List<Tag>> findAllTags(){
		return ResponseEntity.ok(tagService.findAll());
	}
}
