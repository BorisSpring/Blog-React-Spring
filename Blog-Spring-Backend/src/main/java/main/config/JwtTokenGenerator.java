package main.config;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class JwtTokenGenerator extends OncePerRequestFilter{

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {

		
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		if(auth != null) {			
			
			try {
				SecretKey key  = Keys.hmacShaKeyFor(JwtConst.KEY.getBytes(StandardCharsets.UTF_8));
					
				String jwt = Jwts.builder()
						.setIssuer("Boris Dimitrijevic")
						.setIssuedAt(new Date())
						.setExpiration(new Date(new Date().getTime() + 864000))
						.claim("username", auth.getName())
						.claim("authorities", auth.getAuthorities())
						.signWith(key)
						.compact();
				
				response.setHeader(JwtConst.HEADER, jwt);
			}
			catch(Exception ex) {
				throw new BadCredentialsException("Invalid credentials received");
			}
		
		
		}
		filterChain.doFilter(request, response);
	}
	
	
	@Override
	protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
		return request.getServletPath().equals("/auth/login");
	}
}
