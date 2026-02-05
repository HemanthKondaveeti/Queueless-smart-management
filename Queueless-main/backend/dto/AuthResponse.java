package com.queueless.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder // Optional: if you use builder pattern
@AllArgsConstructor
@NoArgsConstructor // Required for JSON (de)serialization
public class AuthResponse {
    private String token;
    private String role; // ✅ Add role to response
}
