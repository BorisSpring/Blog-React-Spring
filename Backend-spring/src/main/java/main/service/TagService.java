package main.service;

import java.util.List;
import java.util.UUID;

import main.domain.Tag;
import main.exceptions.TagException;

public interface TagService {

	 Tag addTag(Tag tag) throws TagException;
	
	 void deleteTag(UUID tagId) throws TagException;
	
	 void updateTag(UUID tagId, String newTagName) throws TagException;
	
	 List<Tag> findAll();
	
	 Tag findById(UUID tagId) throws TagException;
}
