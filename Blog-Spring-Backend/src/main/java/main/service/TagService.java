package main.service;

import java.util.List;

import main.entity.Tag;
import main.exceptions.TagException;

public interface TagService {

	public Tag addTag(Tag tag) throws TagException;
	
	public boolean deleteTag(int tagId) throws TagException;
	
	public boolean updateTag(int tagId, String newTagName) throws TagException;
	
	public List<Tag> findAll();
	
	public Tag findById(int tagId) throws TagException;
}
