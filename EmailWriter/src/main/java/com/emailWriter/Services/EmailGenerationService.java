package com.emailWriter.Services;

import com.emailWriter.DTO.EmailRequest;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jdk.jfr.ContentType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Arrays;
import java.util.Map;

@Service
public class EmailGenerationService {
    private final WebClient webClient;

    @Value("${gemini.api.url}")
    private String apiUrl;

    @Value("${gemini.api.key}")
    private String apiKey;

    @Autowired
    public EmailGenerationService(WebClient webClient) {
        this.webClient = webClient;
    }

    public String generateEmail(EmailRequest emailRequest) {
        String prompt = buildPrompt(emailRequest);
        Map<String, Object> requestBody = Map.of(
                "contents", new Object[]{
                        Map.of("parts", new Object[]{
                                Map.of("text", prompt)
                        })
                }
        );

        try {
            String fullUrl = apiUrl + "?key=" + apiKey;

            String res = webClient.post()
                    .uri(fullUrl)
                    .header("Content-Type", "application/json")
                    .bodyValue(requestBody)
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();

            return extractResponse(res);
        } catch (Exception e) {
            return "Failed to generate email: " + e.getMessage();
        }
    }

    private String extractResponse(String res) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode jsonNode = mapper.readTree(res);
            return jsonNode.path("candidates").get(0).path("content").path("parts")
                    .get(0).path("text").asText();
        } catch (Exception e) {
            return "Error parsing response: " + e.getMessage();
        }
    }

    private String buildPrompt(EmailRequest emailRequest) {
        StringBuilder prompt = new StringBuilder("You are an AI assistant that writes professional and structured email replies.");

        prompt.append(" Your task is to draft a reply email that includes:")
                .append(" a greeting,")
                .append(" a clear and polite body,")
                .append(" and an appropriate closing line and signature.")
                .append(" The tone of the email should be");

        if (emailRequest.getTone() != null && !emailRequest.getTone().isEmpty()) {
            prompt.append(" ")
                    .append(emailRequest.getTone());
        } else {
            prompt.append(" professional");
        }

        prompt.append(". Do NOT include a subject line.")
                .append(" Focus ONLY on generating the email body.")
                .append(" Maintain proper email etiquette and paragraph structure.")
                .append("\n\n--- Original Email ---\n")
                .append(emailRequest.getEmailContent())
                .append("\n\n--- Reply Email ---");



        return prompt.toString();
    }
}
