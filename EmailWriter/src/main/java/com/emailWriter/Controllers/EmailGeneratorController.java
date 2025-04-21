package com.emailWriter.Controllers;

import com.emailWriter.Services.EmailGenerationService;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/ai")
@CrossOrigin(origins = "*")
public class EmailGeneratorController {
    @Autowired
    EmailGenerationService emailGenerationService;
   private final  Logger log=LoggerFactory.getLogger(EmailGenerationService.class);
    @PostMapping
    public ResponseEntity<String> generateEmail(@RequestBody com.emailWriter.DTO.EmailRequest emailRequest){
        log.info("Received email generation request: {}", emailRequest);

        try {
            String email = emailGenerationService.generateEmail(emailRequest);
            log.debug("Generated email content: {}", email);
            return ResponseEntity.ok(email);
        } catch (Exception e) {
            log.error("Error while generating email", e);
            return ResponseEntity.status(500).body("Error generating email");
        }
    }
}