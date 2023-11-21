package main.controllers;

import java.io.IOException;
import java.util.UUID;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import main.domain.User;
import main.model.UserPageList;
import main.requests.UpdateUserInfoRequest;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import main.requests.UpdatePasswordRequest;
import main.service.UserService;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

	private final UserService userService;

	@GetMapping
	public ResponseEntity<UserPageList> findAllUsersHandler(@RequestParam(name = "filterBy", required = false) String filterBy , @RequestParam(name = "page" , defaultValue = "1") int page){
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
	    
	 @PutMapping("/unban/{userId}")
	 @ResponseStatus(HttpStatus.OK)
	 public void unbanUserHandler(@PathVariable(name = "userId") UUID userId){
		 userService.unBanUser(userId);
	 }
	 
	 @PutMapping("/ban/{userId}")
	 @ResponseStatus(HttpStatus.OK)
	 public void  banUserHandler(@PathVariable(name = "userId") UUID userId){
		userService.banUser(userId);
	 }
	 
	 @DeleteMapping("/{userId}")
	 @ResponseStatus(HttpStatus.NO_CONTENT)
	 public void deleteUserHandler(@PathVariable UUID userId){
		userService.deleteUser(userId);
	 }
	 
	 @PutMapping("/changePassword")
	 @ResponseStatus(HttpStatus.OK)
	 public void updatePasswordHandler(@Valid @RequestBody UpdatePasswordRequest updatePasswordRequest,
									   @RequestHeader("Authorization") String jwt ){
		userService.updatePassword(updatePasswordRequest, jwt);
	 }
	 
	 
	 @DeleteMapping("/image/{userId}")
	 @ResponseStatus(HttpStatus.NO_CONTENT)
	 public void deleteImageHandler(@PathVariable(name = "userId") UUID userId,
									@RequestHeader("Authorization") String jwt) throws IOException{
		 userService.deleteImage(userId, jwt);
	 }
	 
	 @PostMapping("/updateImage/{userId}")
	 @ResponseStatus(HttpStatus.OK)
	 public void updateImageHandler(@PathVariable(name = "userId") UUID userId,
									@RequestParam(name = "image", required = true) MultipartFile file,
	 								@RequestHeader("Authorization") String jwt) throws IOException{
		 userService.changeUserPicture(file, userId, jwt);
	 }

	 @PutMapping("/updateInfo")
	 public ResponseEntity<User> updateUserInfo(@Valid @RequestBody UpdateUserInfoRequest request){
		return ResponseEntity.status(HttpStatus.OK).body(userService.updateUserInfo(request));
	 }
}
