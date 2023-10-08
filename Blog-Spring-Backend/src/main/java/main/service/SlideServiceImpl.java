package main.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import main.entity.Slide;
import main.exceptions.SlideException;
import main.repository.SlideRepository;

@Service
public class SlideServiceImpl implements SlideService{

	private SlideRepository slideRepo;
	
	@Value("${upload.dir}")
	private String uploadDir;
	
	public SlideServiceImpl(SlideRepository slideRepo) {
		this.slideRepo = slideRepo;
	}



	@Override
	public boolean setOrder(int slideId, int orderNumber) throws SlideException {
		
		Slide slide = findById(slideId);
		
		slide.setOrderNumber(orderNumber);
		
		Slide savedSlide = slideRepo.save(slide);
		
		if(savedSlide == null) {
			throw new SlideException("Failed to update slide status");
		}
		return true;
		
	}

	@Override
	public boolean enableSlide(int slideId) throws SlideException {
		Slide slide = findById(slideId);
		slide.setEnabled(true);
		Slide savedSlide = slideRepo.save(slide);
		
		if(savedSlide == null) 
			throw new SlideException("Failed to update slide status");
		
		return true;
	}

	@Override
	public boolean disableSlide(int slideId) throws SlideException {
		
		Slide slide = findById(slideId);
		slide.setEnabled(false);
		Slide savedSlide = slideRepo.save(slide);
		
		if(savedSlide == null) 
			throw new SlideException("Failed to update slide status");
		
		return true;
	}

	@Override
	public List<Slide> findNotDisabledSlides() {
		return slideRepo.findNotDisabledSlides();
	}

	@Override
	public Slide findById(int slideId) throws SlideException {
		
		Optional<Slide> opt = slideRepo.findById(slideId);
		
		if(opt.isPresent())
			return opt.get();
		
		throw new SlideException("Slide with id " + slideId + " doesnt exist");
	}



	@Override
	public Slide addSlide(String buttonTitle, String title, String buttonUrl, MultipartFile file, Integer slideId) throws IOException, SlideException {
			
		Slide slide = null;
		String imageName = null;
		
		if(slideId != null) {
			slide = findById(slideId);
		}
		
		Path path = Paths.get(uploadDir);
		
		if(!Files.exists(path)) {
			Files.createDirectories(path);
		}
		
		if(file != null) {
			imageName = UUID.randomUUID().toString() + file.getOriginalFilename();
			Files.copy(file.getInputStream(), path.resolve(imageName), StandardCopyOption.REPLACE_EXISTING);			
		}
		
		if(slide == null)
			slide = new Slide();
		
		
		
		slide.setTitle(title);
		slide.setButtonTitle(buttonTitle);
		slide.setButtonUrl(buttonUrl);
		slide.setEnabled(true);
		
		if(imageName != null)
			slide.setImage(imageName);
		
		
		slide = slideRepo.save(slide);
		
		if(slide == null) 
			throw new SlideException("Fail to add new slide");
		
		
		return slide;
	}



	@Override
	public Page<Slide> getAllSlides(int page, String filterBy) {
		
		PageRequest pageable = PageRequest.of((page - 1), 15);
		
		return slideRepo.findAllSlides( filterBy, pageable);
	}



	@Override
	public boolean deleteSlide(int slideId) throws SlideException {
		 
		 if(!slideRepo.existsById(slideId)) 
			 throw new SlideException("Slide with id " + slideId + " doesnt exists");
		 
		 
		 slideRepo.deleteById(slideId);
		 return true;
		 
	}

}
