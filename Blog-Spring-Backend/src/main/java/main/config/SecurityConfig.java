package main.config;

import java.util.Collections;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.csrf.CsrfFilter;
import org.springframework.security.web.csrf.CsrfTokenRequestAttributeHandler;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import jakarta.servlet.http.HttpServletRequest;

@Configuration
public class SecurityConfig {

	
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		
		CsrfTokenRequestAttributeHandler handler = new CsrfTokenRequestAttributeHandler();
		handler.setCsrfRequestAttributeName("_csrf");
		
		
		
		http.sessionManagement(sesion -> sesion.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
		 .authorizeHttpRequests(authorize -> authorize
				 .requestMatchers(HttpMethod.POST , "/api/users/image/{userId}").permitAll()
				.requestMatchers(HttpMethod.GET ,"/api/users/{imageName}", "/api/categories" ,"/api/blogs/newest" ,"/auth/logged", "/api/blogs","/api/blogs/{blogId}", "/api/blogs/lastThreeImportant", "/api/blogs/threeNewest", "/api/tags" , "/api/slides/enabled").permitAll()
				.requestMatchers(HttpMethod.POST, "/api/comments/{blogId}" , "/api/messages" , "/auth/login", "/auth/signup").permitAll()
			 .requestMatchers("/api/**"	).authenticated())
		 .cors((cors) -> cors.configurationSource(new CorsConfigurationSource() {
			@Override
			public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
				CorsConfiguration config = new CorsConfiguration();
				
				config.setAllowCredentials(true);
				config.setAllowedHeaders(Collections.singletonList("*"));;
				config.setExposedHeaders(Collections.singletonList("Authorization"));
				config.setAllowedMethods(Collections.singletonList("*"));
				config.setAllowedOrigins(Collections.singletonList("http://localhost:5173"));
				config.setMaxAge(86000L);
				
				return config;
			}
		}))
		 .addFilterAfter(new JwtTokenGenerator(), BasicAuthenticationFilter.class)
		 .addFilterBefore(new JwtTokenValidator(), BasicAuthenticationFilter.class)
		 .addFilterAfter(new CsrfTokenFilter(), CsrfFilter.class)
		 .csrf((csrf) -> csrf.csrfTokenRequestHandler(handler).ignoringRequestMatchers(
				 "/api/comments/{blogId}" , "/api/messages" , "/auth/login", "/auth/signup", "/auth/logged" 
				 ).csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse()));
		
		return http.build();
	}
}
