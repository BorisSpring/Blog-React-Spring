package main.service;

import java.io.IOException;
import java.util.List;
import java.util.UUID;
import main.model.SlidePageList;
import main.requests.CreateSlideRequest;
import main.domain.Slide;
import main.exceptions.SlideException;

public interface SlideService {

	
	 void setOrder(UUID slideId, Integer orderNumber) throws SlideException;
	
	 void enableSlide(UUID slideId) throws SlideException;
	
	 void disableSlide(UUID slideId) throws SlideException;

	 Slide findById(UUID slideId) throws SlideException;

	 SlidePageList findAll(int page, String filterBy);
	
	 void deleteSlide(UUID slideId) throws SlideException;

	 List<Slide> findAllEnabled();

	Slide addNewSlide(CreateSlideRequest slideRequest) throws SlideException, IOException;
}
