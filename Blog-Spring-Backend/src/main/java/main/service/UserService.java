package main.service;

import java.io.IOException;

import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import main.entity.User;
import main.exceptions.UserException;
import main.request.LoginRequest;
import main.request.UpdatePasswordRequest;
import main.response.AuthResponse;

public interface UserService {

	
	public User getLoggedUser(String jwt);
	
	public Page<User> findAllUsers(String filterBy, int page);
	
	public boolean changeUserPicture(MultipartFile file, int userId) throws IOException;
	
	public boolean banUser(int userId);
	
	public boolean unBanUser(int userId);
	
	public boolean updatePassword(UpdatePasswordRequest req);
	
	public boolean deleteUser(int userId);
	
	public boolean existsByEmail(String email);
	
	public User findByUserId(int userId) throws UserException;

	public AuthResponse loginUser(LoginRequest req);

	public User createUser(String lastName, String number, String email, String password, String firstName,
			MultipartFile file) throws IllegalStateException, IOException;

	public Boolean deleteImage(int userId) throws IOException;

}
