package main.controllers;

import java.io.IOException;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import main.entity.Slide;
import main.exceptions.SlideException;
import main.service.SlideService;

@RestController
@RequestMapping("/api/slides")
public class SlideController {

	private SlideService slideService;	
	
	public SlideController(SlideService slideService) {
		this.slideService = slideService;
	}


	@PostMapping("")
	public ResponseEntity<Slide> addSlideHandler(@RequestParam("buttonTitle") String buttonTitle,
												 @RequestParam("title") String title ,
												 @RequestParam("buttonUrl") String buttonUrl,
												 @RequestParam(name = "slideId", required = false) Integer slideId,
												 @RequestParam(name = "file", required = false) MultipartFile file) throws SlideException, IOException{
			
		
		return ResponseEntity.status(HttpStatus.OK).body(slideService.addSlide(buttonTitle, title, buttonUrl, file, slideId));
	}
	
	@GetMapping("/{slideId}")
	public ResponseEntity<Slide> findSlideByid(@PathVariable int slideId) throws SlideException {
		return ResponseEntity.status(HttpStatus.OK).body(slideService.findById(slideId));
	}
	
	@DeleteMapping("/{slideId}")
	public ResponseEntity<Boolean> deleteSlideHandler(@PathVariable int  slideId) throws SlideException{

		return ResponseEntity.status(HttpStatus.OK).body(slideService.deleteSlide(slideId));
	}
	
	@PostMapping("/{slideId}/{orderNumber}")
	public ResponseEntity<Boolean> addSlideOrderNumber(@PathVariable Integer slideId, @PathVariable Integer orderNumber) throws SlideException{
		

		return ResponseEntity.status(HttpStatus.OK).body(slideService.setOrder(slideId, orderNumber));
	}
	
	@PostMapping("/enableSlide/{slideId}")
	public ResponseEntity<Boolean> enableSlideHandler(@PathVariable int slideId) throws SlideException{
		
		return ResponseEntity.status(HttpStatus.OK).body(slideService.enableSlide(slideId));
	}
	
	@PostMapping("/disable/{slideId}")
	public ResponseEntity<Boolean> disableSlideHandler(@PathVariable int slideId) throws SlideException{
		
		return ResponseEntity.status(HttpStatus.OK).body(slideService.disableSlide(slideId));
	}
	
	
	
	@GetMapping
	public ResponseEntity<Page<Slide>> findAllSlidesHandler(@RequestParam(name="filterBy", required = false) String filterBy ,@RequestParam(name="page", defaultValue = "1")int page ){
		
		
		slideService.getAllSlides(page, filterBy).forEach(c -> System.out.println(c.getId()));
		
		return ResponseEntity.status(HttpStatus.OK).body(slideService.getAllSlides(page, filterBy));
	}
}
