package main.controllers;

import java.io.IOException;
import java.util.List;
import java.util.UUID;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import main.model.SlidePageList;
import main.requests.CreateSlideRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import main.domain.Slide;
import main.exceptions.SlideException;
import main.service.SlideService;

@RestController
@RequestMapping("/api/slides")
@RequiredArgsConstructor
public class SlideController {

	private final SlideService slideService;

	@PostMapping
	public ResponseEntity<Slide> addSlideHandler(@Valid @ModelAttribute CreateSlideRequest slideRequest) throws SlideException, IOException {
		return ResponseEntity.status(HttpStatus.CREATED).body(slideService.addNewSlide(slideRequest));
	}
	
	@GetMapping("/{slideId}")
	public ResponseEntity<Slide> findSlideById(@PathVariable(name = "slideId") UUID slideId) throws SlideException {
		return ResponseEntity.status(HttpStatus.OK).body(slideService.findById(slideId));
	}
	
	@DeleteMapping("/{slideId}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deleteSlideHandler(@PathVariable(name = "slideId") UUID  slideId) throws SlideException{
		slideService.deleteSlide(slideId);
	}
	
	@PutMapping("/{slideId}/{orderNumber}")
	@ResponseStatus(HttpStatus.OK)
	public void addSlideOrderNumber(@PathVariable(name = "slideId") UUID slideId ,
									@PathVariable(name = "orderNumber") Integer orderNumber) throws SlideException{
	 	slideService.setOrder(slideId, orderNumber);
	}
	
	@PutMapping("/enableSlide/{slideId}")
	public void enableSlideHandler(@PathVariable(name = "slideId") UUID slideId ) throws SlideException{
		slideService.enableSlide(slideId);
	}
	
	@PutMapping("/disable/{slideId}")
	@ResponseStatus(HttpStatus.OK)
	public void disableSlideHandler(@PathVariable(name = "slideId") UUID slideId ) throws SlideException{
		slideService.disableSlide(slideId);
	}

	@GetMapping("/allSlides")
	public ResponseEntity<SlidePageList> findAllSlidesHandler(@RequestParam(name="filterBy", required = false) String filterBy ,
															  @RequestParam(name="page", defaultValue = "1", required = false)int page ){
		return ResponseEntity.status(HttpStatus.OK).body(slideService.findAll(page, filterBy));
	}
	
	@GetMapping
	public ResponseEntity<List<Slide>> findEnabledSlides(){
		return ResponseEntity.status(HttpStatus.OK).body(slideService.findAllEnabled());
	}
}
