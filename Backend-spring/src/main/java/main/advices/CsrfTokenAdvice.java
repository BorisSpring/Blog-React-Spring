package main.advices;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class CsrfTokenAdvice {

    @ModelAttribute
    public void getCsrfToken(HttpServletResponse response, CsrfToken csrfToken){
         response.setHeader(csrfToken.getHeaderName(), csrfToken.getToken());
    }
}
