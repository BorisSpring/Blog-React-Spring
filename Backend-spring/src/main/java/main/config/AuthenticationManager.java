package main.config;

import java.util.ArrayList;
import java.util.List;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import main.domain.Authority;
import main.domain.User;
import main.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class AuthenticationManager implements AuthenticationProvider{

	private final UserRepository userRepo;
	private final PasswordEncoder passwordEncoder;
	


	@Override
	public Authentication authenticate(Authentication authentication) throws AuthenticationException {
			String username = authentication.getName();
			String pwd = authentication.getCredentials().toString();
			
			User user = userRepo.findByEmail(username);
			if(user != null && passwordEncoder.matches(pwd, user.getPassword())) {
				return new UsernamePasswordAuthenticationToken(username, pwd, populateAuthorities(user.getAuthority()));
			}else {
				throw new BadCredentialsException("Invalid Credentials");
			}
	}


	private List<GrantedAuthority> populateAuthorities(Authority authorities){
		List<GrantedAuthority> auths = new ArrayList<>();
		
			auths.add(new SimpleGrantedAuthority(authorities.getAuthority()));
		
		return auths;
	}
	
	 @Override
	    public boolean supports(Class<?> authentication) {
	        return (UsernamePasswordAuthenticationToken.class.isAssignableFrom(authentication));
	    }

}
