package main.service;

import java.util.List;
import java.util.UUID;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import main.domain.Tag;
import main.exceptions.TagException;
import main.repository.TagRepository;

@Service
@RequiredArgsConstructor
public class TagServiceImpl implements TagService {

	private final TagRepository tagRepo;


	@Override
	public Tag addTag(Tag tag) throws TagException {

		if(tagRepo.existsByName(tag.getName()))
			throw new TagException("There is alerdy tag with same name, please chose another one!");

		tag = tagRepo.save(tag);
		
		if(tag == null)
			throw new TagException("Fail to save tag");

		return tag;
	}

	@Override
	public void deleteTag(UUID tagId) throws TagException {
		if(!tagRepo.existsById(tagId))
			throw new TagException("Tag with id " + tagId + " doesnt exists");

		tagRepo.deleteById(tagId);

	}

	@Override
	public void updateTag(UUID tagId, String newTagName) throws TagException {

		Tag tag = tagRepo.findById(tagId).orElseThrow(() -> new TagException("Tag with id " + tagId + " doesnt exists"));

		if(tagRepo.existsByName(newTagName))
			throw new TagException("Tag with name " + newTagName + " alerd exists, Please chose another one!");

		tag.setName(newTagName);
		tag = tagRepo.saveAndFlush(tag);

		if(tag == null)
			throw new TagException("Fail to update tag name");
	}

	@Override
	public List<Tag> findAll() {
		return tagRepo.findAll();
	}

	@Override
	public Tag findById(UUID tagId) throws TagException {
	 	return  tagRepo.findById(tagId).orElseThrow(() -> new TagException("Tag with id " + tagId + " doesnt exists"));
	}
}
