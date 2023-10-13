package main.controllers;

import java.io.IOException;

import org.springframework.core.io.ClassPathResource;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import main.entity.User;
import main.request.UpdatePasswordRequest;
import main.service.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {

	
	private UserService userService;
	
	
	public UserController(UserService userService) {
		this.userService = userService;
	}


	@GetMapping
	public ResponseEntity<Page<User>> findAllUsersHandler(@RequestParam(name = "filterBy", required = false) String filterBy , @RequestParam(name = "page" , defaultValue = "1") int page){
			
			return ResponseEntity.status(HttpStatus.OK).body(userService.findAllUsers(filterBy, page));
	}
	
	 @GetMapping("/{imageName}")
	    public ResponseEntity<byte[]> getImage(@PathVariable String imageName) throws IOException {
		 	
	    	System.out.println(imageName);
	        var imgFile = new ClassPathResource("static/" + imageName  );
	        System.out.println(imgFile + " exists: " + imgFile.exists());
	        byte[] bytes = StreamUtils.copyToByteArray(imgFile.getInputStream());

	        return ResponseEntity
	                .ok()
	                .contentType(MediaType.IMAGE_JPEG)
	                .body(bytes);
	        
	 }
	    
	 @PostMapping("/unban/{userId}")
	 public ResponseEntity<Boolean> unbanUserHandler(@PathVariable int userId){
		 
		 return ResponseEntity.status(HttpStatus.OK).body(userService.unBanUser(userId));
		 
	 }
	 
	 @PostMapping("/ban/{userId}")
	 public ResponseEntity<Boolean> banUserHandler(@PathVariable int userId){
		 
		 return ResponseEntity.status(HttpStatus.OK).body(userService.banUser(userId));
		 
	 }
	 
	 @DeleteMapping("/{userId}")
	 public ResponseEntity<Boolean> deleteUserHandler(@PathVariable int userId){
		 
		 return ResponseEntity.status(HttpStatus.OK).body(userService.deleteUser(userId));
		 
	 }
	 
	 @PostMapping("/update")
	 public ResponseEntity<Boolean> updatePasswordHandler(@RequestBody UpdatePasswordRequest req){
		 
		 return ResponseEntity.status(HttpStatus.OK).body(userService.updatePassword(req));
	 }
	 
	 
	 @DeleteMapping("/image/{userId}")
	 public ResponseEntity<Boolean> deleteImageHandler(@PathVariable Integer userId) throws IOException{
		 
		 return ResponseEntity.status(HttpStatus.OK).body(userService.deleteImage(userId));
	 }
	 
	 @PostMapping("/updateImage/{userId}")
	 public ResponseEntity<Boolean> updateImageHandler(@PathVariable int userId, @RequestParam(name = "image", required = true) MultipartFile file) throws IOException{
		 
		 return ResponseEntity.status(HttpStatus.OK).body(userService.changeUserPicture(file, userId));
	 }
}
