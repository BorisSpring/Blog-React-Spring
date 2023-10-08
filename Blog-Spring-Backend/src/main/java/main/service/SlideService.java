package main.service;

import java.io.IOException;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import main.entity.Slide;
import main.exceptions.SlideException;

public interface SlideService {

	
	public boolean setOrder(int slideId, int orderNumber) throws SlideException;
	
	public boolean enableSlide(int slideId) throws SlideException;
	
	public boolean disableSlide(int slideId) throws SlideException;
	
	public List<Slide> findNotDisabledSlides();
	
	public Slide findById(int slideId) throws SlideException;

	public Slide addSlide(String buttonTitle, String title, String buttonUrl, MultipartFile file, Integer slideId) throws IOException, SlideException;
	
	public Page<Slide> getAllSlides(int page, String filterBy);
	
	public boolean deleteSlide(int slideId) throws SlideException;
}
