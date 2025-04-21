package com.emailWriter.DTO;


import lombok.Data;
import lombok.ToString;

@Data
@ToString

public class EmailRequest {
  private String emailContent;
  private String tone;

  public String getEmailContent() {
    return emailContent;
  }

  public void setEmailContent(String emailContent) {
    this.emailContent = emailContent;
  }

  public String getTone() {
    return tone;
  }

  public void setTone(String tone) {
    this.tone = tone;
  }

  }
