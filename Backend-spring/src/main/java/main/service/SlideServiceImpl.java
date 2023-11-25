package main.service;

import java.io.IOException;
import java.nio.file.*;
import java.util.List;
import java.util.UUID;
import jakarta.transaction.Transactional;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import main.model.SlidePageList;
import main.requests.CreateSlideRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import main.domain.Slide;
import main.exceptions.SlideException;
import main.repository.SlideRepository;

@Service
@RequiredArgsConstructor
@Getter
public class SlideServiceImpl implements SlideService{
	private final SlideRepository slideRepo;
	@Value("${upload.dir}")
	private String uploadDir;

	@Transactional
	@Override
	public void setOrder(UUID slideId, Integer orderNumber) throws SlideException {
		
		Slide slide = findById(slideId);

		if(slideRepo.existsByOrderNumber(orderNumber))
			throw new SlideException("There is alerdy slide with same order number!");

		slide.setOrderNumber(orderNumber);
		slide =  slideRepo.save(slide);
		
		if(slide == null)
			throw new SlideException("Failed to update slide status");
	}

	@Transactional
	@Override
	public void enableSlide(UUID slideId) throws SlideException {

		Slide slide = findById(slideId);

		if(slide.isEnabled() == false){
			slide.setEnabled(true);
			 slideRepo.save(slide);
		}
	}

	@Transactional
	@Override
	public void disableSlide(UUID slideId) throws SlideException {
		
		Slide slide = findById(slideId);

		if(slide.isEnabled() == true){
			slide.setEnabled(false);
			slideRepo.save(slide);
		}
	}

	@Override
	public Slide findById(UUID slideId) throws SlideException {
		return  slideRepo.findById(slideId).orElseThrow(() -> new SlideException("Slide with id " + slideId + " doesnt exist"));
	}

	@Override
	public SlidePageList findAll(int page, String filterBy) {
		PageRequest pageable = PageRequest.of(page > 0 ? (page - 1) : 0, 15);
		Page<Slide> slidePage = slideRepo.findAllSlides(filterBy, pageable);
		return new SlidePageList(slidePage.getContent(), pageable, slidePage.getTotalElements());
	}

	@Transactional
	@Override
	public void deleteSlide(UUID slideId) throws SlideException {
		 if(!slideRepo.existsById(slideId)) 
			 throw new SlideException("Slide with id " + slideId + " doesnt exists");

		 slideRepo.deleteById(slideId);
	}

	@Override
	public List<Slide> findAllEnabled() {
		 return slideRepo.findAllEnabled();
	}

	@Transactional
	@Override
	public Slide addNewSlide(CreateSlideRequest slideRequest) throws SlideException, IOException {
		Slide slide = null;
		String imageName = null;

		if(slideRequest.getSlideId() != null)
			slide = findById(slideRequest.getSlideId());

		Path path = Paths.get(uploadDir);

		if(!Files.exists(path))
			Files.createDirectories(path);

		if(slideRequest.getImage() != null){
			imageName = UUID.randomUUID().toString() + slideRequest.getImage().getOriginalFilename();
			Files.copy(slideRequest.getImage().getInputStream(), path.resolve(imageName), StandardCopyOption.REPLACE_EXISTING);
		}
		slide = Slide.builder()
				.id(slideRequest.getSlideId() == null ? null : slideRequest.getSlideId())
				.enabled(slideRequest.getSlideId() == null ? true : slide.isEnabled())
				.orderNumber(slideRequest.getSlideId() ==  null ? null : slide.getOrderNumber())
				.image(imageName == null ? slide.getImage() : imageName)
				.title(slideRequest.getTitle())
				.buttonUrl(slideRequest.getButtonUrl())
				.buttonTitle(slideRequest.getButtonTitle())
				.build();

		Slide updatedSlide = slideRepo.saveAndFlush(slide);

		if(updatedSlide == null)
			throw new SlideException(slideRequest.getSlideId() == null ? "Fail to add new slide" : " Fail to update slide");

		return  updatedSlide;
	}

}
