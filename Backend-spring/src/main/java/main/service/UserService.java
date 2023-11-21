package main.service;

import java.io.IOException;
import java.util.UUID;

import main.model.UserPageList;
import main.requests.CreateUserRequest;
import main.requests.UpdateUserInfoRequest;
import org.springframework.web.multipart.MultipartFile;

import main.domain.User;
import main.exceptions.UserException;
import main.requests.LoginRequest;
import main.requests.UpdatePasswordRequest;
import main.response.AuthResponse;

public interface UserService {

	
	 User getLoggedUser(String jwt);
	
	 UserPageList findAllUsers(String filterBy, int pageNumber);
	
	 void changeUserPicture(MultipartFile file, UUID userId, String jwt) throws IOException;
	
	 void banUser(UUID userId);
	
	 void unBanUser(UUID userId);
	
	 void updatePassword(UpdatePasswordRequest req, String jwt);

	 void deleteUser(UUID userId);
	
	 boolean existsByEmail(String email);
	
	 User findByUserId(UUID userId) throws UserException;

	 AuthResponse loginUser(LoginRequest req);

	 User createUser(CreateUserRequest request) throws IllegalStateException, IOException;

	 void deleteImage(UUID userId, String jwt) throws IOException;

    User updateUserInfo(UpdateUserInfoRequest request);
}
