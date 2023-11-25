package main.service;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Collections;
import java.util.Date;
import java.util.UUID;
import javax.crypto.SecretKey;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import main.model.UserPageList;
import main.requests.CreateUserRequest;
import main.requests.UpdateUserInfoRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.transaction.Transactional;
import main.filters.JwtConst;
import main.domain.User;
import main.exceptions.UserException;
import main.repository.AuthorityRepository;
import main.repository.UserRepository;
import main.requests.LoginRequest;
import main.requests.UpdatePasswordRequest;
import main.response.AuthResponse;

@Service
@RequiredArgsConstructor
@Getter
public class UserServiceImpl implements UserService {

	private final UserRepository userRepo;
	private final PasswordEncoder passwordEncoder;
	private final AuthorityRepository authorityRepo;
	
	@Value("${upload.dir}")
	private String uploadDir;


	@Transactional
	@Override
	public void banUser(UUID userId) {
		User user = findByUserId(userId);
		if(user.isEnabled() == true){
			user.setEnabled(false);
			userRepo.save(user);
		}
	}

	@Override
	public void unBanUser(UUID userId) {
		User user = findByUserId(userId);
		if(user.isEnabled() == false){
			user.setEnabled(true);
			userRepo.save(user);
		}
	}

	@Override
	@Transactional
	public void updatePassword(UpdatePasswordRequest req, String jwt) {
	  User user = findByUserId(req.getUserId());

	  User loggedUser = getLoggedUser(jwt);

	  if(!loggedUser.getId().equals(user.getId()))
		  throw new UserException("U cannot change other user password!");

	  if(!passwordEncoder.matches(req.getOldPassword(), user.getPassword()))
		  throw new UserException("Incorrect Password");

	  
	  if(!req.getNewPassword().equals(req.getRepeatedNewPassword()))
		  throw new UserException("Password Must Match");

	  user.setPassword(passwordEncoder.encode(req.getRepeatedNewPassword()));
	  userRepo.save(user);
	}

	@Transactional
	@Override
	public void deleteUser(UUID userId) {
		if (!userRepo.existsById(userId))
			throw new UserException("User with id " + userId + " not found");

		userRepo.deleteById(userId);
	}

	@Override
	public boolean existsByEmail(String email) {
		return userRepo.existsByEmail(email);
	}

	@Override
	public User findByUserId(UUID userId) throws UserException {
		return  userRepo.findById(userId).orElseThrow(() -> new UserException("User doesnt exists"));
	}

	@Override
	public AuthResponse loginUser(LoginRequest req) {

		User user = userRepo.findByEmail(req.getUsername());
		if(user != null && passwordEncoder.matches(req.getPassword(), user.getPassword())) {
			try {
				Authentication auth = new UsernamePasswordAuthenticationToken(user.getEmail(), null, Collections.singletonList(new SimpleGrantedAuthority(user.getAuthority().getAuthority())));
				SecurityContextHolder.getContext().setAuthentication(auth);

				SecretKey key = Keys.hmacShaKeyFor(JwtConst.KEY.getBytes(StandardCharsets.UTF_8));

				String jwt = Jwts.builder()
						.setIssuedAt(new Date())
						.setIssuer("Boris Dimitrijevic")
						.setExpiration(new Date(new Date().getTime() + 86400000))
						.claim("username", req.getUsername())
						.claim("authorities", user.getAuthority().getAuthority())
						.signWith(key)
						.compact();
				return new AuthResponse(true, jwt);
			} catch (Exception e) {
				throw new BadCredentialsException("Fail To Login, Try Again");
			}

		}else {
			throw new BadCredentialsException("Invalid Credentials");
		}
		
	}

	@Transactional
	@Override
	public User createUser(CreateUserRequest request) throws IllegalStateException, IOException {
		
		String imageName = null;
		
		if(request.getImageFile() != null) {
			imageName = UUID.randomUUID().toString()  + request.getImageFile().getOriginalFilename();
			Path uploadPath = Paths.get(uploadDir);
			
			if(!Files.exists(uploadPath)) {
				Files.createDirectories(uploadPath);
			}
			Files.copy(request.getImageFile().getInputStream(), uploadPath.resolve(imageName), StandardCopyOption.REPLACE_EXISTING);
		}

		User newUser = userRepo.save(User.builder()
						.firstName(request.getFirstName())
						.lastName(request.getLastName())
						.email(request.getEmail())
						.enabled(true)
						.password(passwordEncoder.encode(request.getPassword()))
						.number(request.getNumber())
						.image(imageName == null ? "avatar.svg" : imageName)
						.authority(authorityRepo.findByAuthority("admin"))
						.build());

		if(newUser == null)
			throw new UserException("Fail to create new user");

		return newUser;
	}


	@Override
	public UserPageList findAllUsers(String filterBy, int page) {
		Boolean filterValue = null;

		if(filterBy != null)
			filterValue = filterBy.equals("enabled") ? true : false;

		PageRequest pageable = PageRequest.of((page > 0 ? (page - 1) : 0), 15);
		Page<User> userPageList = userRepo.findAll(filterValue, pageable);
		return new UserPageList(userPageList.getContent(), pageable, userPageList.getTotalElements());
	}

	@Override
	public User getLoggedUser(String jwt) {

			try {
				jwt = jwt.substring(7);
				SecretKey key = Keys.hmacShaKeyFor(JwtConst.KEY.getBytes(StandardCharsets.UTF_8));
				
				Claims claims = Jwts.parserBuilder()
						.setSigningKey(key)
						.build()
						.parseClaimsJws(jwt)
						.getBody();
				
				String username = String.valueOf(claims.get("username"));
				return userRepo.findByEmail(username);
				
			} catch (Exception e) {
				throw new BadCredentialsException("Invalid token received...");
			}
	}



	@Transactional
	@Override
	public void deleteImage(UUID userId, String jwt) throws IOException {

		User user = findByUserId(userId);
		User loggedUser = getLoggedUser(jwt);

		if(!loggedUser.getId().equals(user.getId()))
			 throw new UserException("U cannot delete other user image!");

		if(user.getImage() != null){
			Path path = Paths.get(uploadDir + "/" + user.getImage());
			if(!Files.exists(path))
				throw new UserException("Image doesnt exists");

			Files.delete(path);
			user.setImage(null);
			userRepo.saveAndFlush(user);
		}
	}

	@Transactional
	@Override
	public User updateUserInfo(UpdateUserInfoRequest request) {
		User user = findByUserId(request.getId());
		if(!user.getEmail().equals(request.getEmail()) && userRepo.existsByEmail(request.getEmail()))
			throw new UserException("There is alerdy use with same email adress!");

		user.setEmail(request.getEmail());
		user.setFirstName(request.getFirstName());
		user.setLastName(request.getLastName());
		user.setNumber(request.getNumber());
		user = userRepo.saveAndFlush(user);

		if(user == null)
			throw new UserException("Fail to update user informations");

		return user;
	}

	@Override
	public void changeUserPicture(MultipartFile file, UUID userId, String jwt) throws IOException {
		
		User user = findByUserId(userId);
		User loggedUser = getLoggedUser(jwt);

		if(!loggedUser.getId().equals(user.getId()))
			throw new UserException("U cannot change other use picture!");

		Path path = null;
		if(file != null && !file.isEmpty() && file.getOriginalFilename().endsWith(".jpg") || file.getOriginalFilename().endsWith(".png")) {

			if (user.getImage() != null && user.getImage().length() > 1) {
				path = Paths.get(uploadDir + "/" + user.getImage());
					if (Files.exists(path))
							Files.delete(path);
			}

			String imageName = UUID.randomUUID().toString() + file.getOriginalFilename();

			path = Paths.get(uploadDir);
			if (!Files.exists(path)) {
				Files.createDirectories(path);
			}

			Files.copy(file.getInputStream(), path.resolve(imageName), StandardCopyOption.REPLACE_EXISTING);

			user.setImage(imageName);
			userRepo.saveAndFlush(user);
		}
	}

}
