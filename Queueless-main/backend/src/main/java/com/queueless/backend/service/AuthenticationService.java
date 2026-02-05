package com.queueless.backend.service;

import com.queueless.backend.dto.AuthRequest;
import com.queueless.backend.dto.AuthResponse;
import com.queueless.backend.dto.RegisterRequest;
import com.queueless.backend.entity.Role;
import com.queueless.backend.entity.User;
import com.queueless.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthResponse register(RegisterRequest request) {
    System.out.println("🔐 Register request role: " + request.getRole()); // Log role
    try {
        Role role = Role.valueOf(request.getRole().toUpperCase());
        var user = User.builder()
                .fullName(request.getFullName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(role)
                .build();
        userRepository.save(user);
        var jwt = jwtService.generateToken(user);
        return new AuthResponse(jwt, role.name());
    } catch (Exception e) {
        System.out.println("❌ Registration failed: " + e.getMessage());
        throw e;
    }
}


    public AuthResponse authenticate(AuthRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var user = userRepository.findByEmail(request.getEmail()).orElseThrow();
        var jwt = jwtService.generateToken(user);
        return new AuthResponse(jwt, user.getRole().name()); // Include role in response
    }
}
