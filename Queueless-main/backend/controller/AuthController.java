
package com.queueless.backend.controller;

import com.queueless.backend.dto.AuthRequest;
import com.queueless.backend.dto.AuthResponse;
import com.queueless.backend.dto.RegisterRequest;
import com.queueless.backend.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationService authService;

   @PostMapping("/register")
public AuthResponse register(@RequestBody RegisterRequest request) {
    System.out.println("📥 Register request received: " + request);
    return authService.register(request);
}


    @PostMapping("/login")
    public AuthResponse login(@RequestBody AuthRequest request) {
        return authService.authenticate(request);
    }
}
