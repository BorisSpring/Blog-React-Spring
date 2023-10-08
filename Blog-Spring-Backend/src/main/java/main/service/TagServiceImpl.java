package main.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import main.entity.Tag;
import main.exceptions.TagException;
import main.repository.TagRepository;

@Service
public class TagServiceImpl implements TagService {

	private TagRepository tagRepo;

	public TagServiceImpl(TagRepository tagRepo) {
		this.tagRepo = tagRepo;
	}

	@Override
	public Tag addTag(Tag tag) throws TagException {
		
		tag.setCreatedAt(LocalDateTime.now());
		Tag savedTag = tagRepo.save(tag);
		
		if(savedTag == null) {
			throw new TagException("Fail to save tag");
		}
		return savedTag;
	}

	@Override
	public boolean deleteTag(int tagId) throws TagException {
		if(tagRepo.existsById(tagId)) {
			tagRepo.deleteById(tagId);
			return true;
		}
		throw new TagException("Tag with id " + tagId + " doesnt exists");
	}

	@Override
	public boolean updateTag(int tagId, String newTagName) throws TagException {
	 
		Optional<Tag> opt = tagRepo.findById(tagId);
		
		if(opt.isPresent()) {
			Tag tag = opt.get();
			tag.setName(newTagName);
			tag = tagRepo.save(tag);
			
			if(tag == null) 
				throw new TagException("Fail to update tag name");
			
			
			return true;
		}
		throw new TagException("Tag with id " + tagId + " doesnt exists");

	}

	@Override
	public List<Tag> findAll() {
		return tagRepo.findAll();
	}

	@Override
	public Tag findById(int tagId) throws TagException {
		 Optional<Tag> opt = tagRepo.findById(tagId);
		 
		 if(opt.isPresent())
			return opt.get();
		 
		 throw new TagException("Tag with id " + tagId + " doesnt exists");
	}

	
	
	
}
