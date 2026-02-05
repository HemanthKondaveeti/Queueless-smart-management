
package com.queueless.backend.dto;

import lombok.Data;

@Data
public class RegisterRequest {
    private String fullName;
    private String email;
    private String password;
    private String role; // Add this field
}

