package main.service;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Date;
import java.util.Optional;
import java.util.UUID;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.transaction.Transactional;
import main.config.JwtConst;
import main.entity.User;
import main.exceptions.UserException;
import main.repository.AuthorityRepository;
import main.repository.UserRepository;
import main.request.LoginRequest;
import main.request.UpdatePasswordRequest;
import main.response.AuthResponse;

@Service
public class UserServiceImpl implements UserService {

	private UserRepository userRepo;
	private PasswordEncoder passwordEncoder;
	private AuthorityRepository authorityRepo;
	
	@Value("${upload.dir}")
	private String uploadDir;
	

	public UserServiceImpl(UserRepository userRepo, PasswordEncoder passwordEncoder,
			AuthorityRepository authorityRepo) {
		this.userRepo = userRepo;
		this.passwordEncoder = passwordEncoder;
		this.authorityRepo = authorityRepo;
	}



	@Transactional
	@Override
	public boolean banUser(int userId) {
		
		User user = findByUserId(userId);
		user.setEnabled(false);
		
		User updatedUser = userRepo.save(user);
		
		return updatedUser.isEnabled() ?  false: true;
	}

	@Override
	public boolean unBanUser(int userId) {
	
		User user = findByUserId(userId);
		user.setEnabled(true);
		
		User updatedUser = userRepo.save(user);
		
		return updatedUser.isEnabled() ?  true : false;
	}

	@Override
	public boolean updatePassword(UpdatePasswordRequest req) {
		
		User user = findByUserId(req.getUserId());
		
	  if(!passwordEncoder.matches(req.getOldPassword(), user.getPassword())) {
		  throw new UserException("Incorrect Password");
	  }
	  
	  if(!req.getNewPassword().equals(req.getRepeatedNewPassword())) {
		  throw new UserException("Password Must Match");
	  }
	  
	  user.setPassword(passwordEncoder.encode(req.getRepeatedNewPassword()));
	  
	  User updatedUser = userRepo.save(user);
	  
	  if(updatedUser == null) {
		  throw new UserException("Failed to change password");
	  }
	  return true;
	  
	}

	@Transactional
	@Override
	public boolean deleteUser(int userId) {
		
		userRepo.deleteById(userId);
		return true;
	}

	@Override
	public boolean existsByEmail(String email) {
		return userRepo.existsByEmail(email);
	}

	@Override
	public User findByUserId(int userId) throws UserException {
		
		Optional<User> opt = userRepo.findById(userId);
		
		if(opt.isPresent()) {
			return opt.get();
		}else {
			throw new UserException("User with id " + userId +  " doesnt exists!");
		}
	}

	
	@Override
	public AuthResponse loginUser(LoginRequest req) {
			
		User user = userRepo.findByEmail(req.getUsername());



		if(user != null && passwordEncoder.matches(req.getPassword(), user.getPassword())) {
			
			try {
				
				Authentication auth = new UsernamePasswordAuthenticationToken(user.getEmail(), null, null);
				SecurityContextHolder.getContext().setAuthentication(auth);

				SecretKey key = Keys.hmacShaKeyFor(JwtConst.KEY.getBytes(StandardCharsets.UTF_8));

				String jwt = Jwts.builder()
						.setIssuedAt(new Date())
						.setIssuer("Boris Dimitrijevic")
						.setExpiration(new Date(new Date().getTime() + 86400000))
						.claim("username", req.getUsername())
						.claim("authorities", user.getAuthority())
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
	public User createUser(String lastName, String number, String email, String password, String firstName,
			MultipartFile file) throws IllegalStateException, IOException {
		
		String imageName = null;
		
		if(file != null) {
			imageName = UUID.randomUUID().toString()  + file.getOriginalFilename();
			Path uploadPath = Paths.get(uploadDir);
			
			if(!Files.exists(uploadPath)) {
				Files.createDirectories(uploadPath);
			}
			
			
			Files.copy(file.getInputStream(), uploadPath.resolve(imageName), StandardCopyOption.REPLACE_EXISTING);		
		}


		
		User user = new User();
		user.setFirstName(firstName);
		user.setLastName(lastName);
		user.setEmail(email);
		user.setEnabled(true);
		user.setPassword(passwordEncoder.encode(password));
		user.setNumber(number);
		user.setImage(firstName);
		user.setImage(imageName);
		user.setAuthority(authorityRepo.findByauthority("admin"));
		
		User savedUser = userRepo.save(user);

		if(savedUser == null) {
			throw new UserException("Fail to add new user");
		}
		
		return savedUser;
	}


	@Override
	public Page<User> findAllUsers(String filterBy, int page) {
		
		Boolean filterValue = null;
		
		if(filterBy != null && filterBy.equals("enabled")) {
				filterValue = true;
		}else if(filterBy != null && filterBy.equals("disabled")) {
			filterValue = false;
		}
		
		PageRequest pageable = PageRequest.of((page - 1), 15);
		return userRepo.findAll(filterValue, pageable);
	}

	@Override
	public User getLoggedUser(String jwt) {
		
		jwt = jwt.substring(7);
			try {
				SecretKey key = Keys.hmacShaKeyFor(JwtConst.KEY.getBytes(StandardCharsets.UTF_8));
				
				Claims claims = Jwts.parserBuilder()
						.setSigningKey(key)
						.build()
						.parseClaimsJws(jwt)
						.getBody();
				
				String username = String.valueOf(claims.get("username"));
				return userRepo.findByEmail(username);
				
			} catch (Exception e) {
				throw e;
			}
	}



	@Transactional
	@Override
	public Boolean deleteImage(int userId) throws IOException {

		User user = findByUserId(userId);
		
		Path path = Paths.get(uploadDir + "/" + user.getImage());
		
		if(Files.exists(path)) {
			Files.delete(path);
		}else {
			throw new UserException("Image doesnt exists");
		}
		user.setImage(null);
		user = userRepo.save(user);
		
		if(user != null)
			return true;
		
		throw new UserException("Fail to delete user image");
	}



	@Override
	public boolean changeUserPicture(MultipartFile file, int userId) throws IOException {
		
		User user = findByUserId(userId);
		Path path = null;
		
		if(user.getImage() != null && user.getImage().length() > 1) {
			path = Paths.get(uploadDir + "/" + user.getImage());
			if(Files.exists(path)) 
				Files.delete(path);			
		}
		
		String imageName = UUID.randomUUID().toString() + file.getOriginalFilename();

		path = Paths.get(uploadDir);
		if(!Files.exists(path)) {
			Files.createDirectories(path);
		}
		
		if(file != null) 
			Files.copy(file.getInputStream(), path.resolve(imageName), StandardCopyOption.REPLACE_EXISTING);
			
		user.setImage(imageName);
		user = userRepo.save(user);
		
		if(user == null) {
			throw new UserException("Fail to update user image");
		}
		return true;
		
	}



	




}
