package com.queueless.backend.controller;

import com.queueless.backend.entity.QueueToken;
import com.queueless.backend.entity.TokenStatus;
import com.queueless.backend.model.Department;
import com.queueless.backend.repository.DepartmentRepository;
import com.queueless.backend.repository.QueueTokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.*;

@RestController
@RequestMapping("/api/queue")
@RequiredArgsConstructor
public class QueueController {

    private final DepartmentRepository departmentRepo;
    private final QueueTokenRepository queueTokenRepo;

    @PostMapping("/join")
    public ResponseEntity<?> joinQueue(@RequestBody Map<String, Long> body) {
        Long departmentId = body.get("departmentId");

        Department dept = departmentRepo.findById(departmentId)
                .orElseThrow(() -> new RuntimeException("Department not found"));

        Optional<QueueToken> lastToken = queueTokenRepo
                .findTopByDepartmentOrderByBookingTimeDesc(dept);

        int nextToken = lastToken
                .map(t -> Integer.parseInt(t.getTokenNumber()) + 1)
                .orElse(1);

        QueueToken token = QueueToken.builder()
                .tokenNumber(String.valueOf(nextToken))
                .department(dept)
                .serviceCenter(dept.getServiceCenter())
                .bookingTime(LocalDateTime.now())
                .status(TokenStatus.QUEUED)
                .build();

        queueTokenRepo.save(token);

        int estimatedWait = dept.getAvgServiceTime() * (nextToken - 1);

        return ResponseEntity.ok(Map.of(
                "tokenNumber", nextToken,
                "estimatedWaitTime", estimatedWait
        ));
    }

    @GetMapping("/list/{departmentId}")
    public ResponseEntity<?> listQueue(@PathVariable Long departmentId) {
        Department dept = departmentRepo.findById(departmentId)
                .orElseThrow(() -> new RuntimeException("Department not found"));

        List<QueueToken> tokens = queueTokenRepo
                .findByDepartmentAndStatus(dept, TokenStatus.QUEUED);

        List<Map<String, Object>> result = new ArrayList<>();
        for (QueueToken t : tokens) {
            Map<String, Object> map = new HashMap<>();
            map.put("tokenNumber", t.getTokenNumber());
            map.put("status", t.getStatus());
            result.add(map);
        }

        return ResponseEntity.ok(result);
    }

    @PostMapping("/serve/{tokenNumber}")
    public ResponseEntity<?> serveToken(@PathVariable String tokenNumber) {
        QueueToken token = queueTokenRepo.findAll().stream()
                .filter(t -> t.getTokenNumber().equals(tokenNumber))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Token not found"));

        token.setStatus(TokenStatus.SERVED);
        queueTokenRepo.save(token);

        return ResponseEntity.ok(Map.of("message", "Token served"));
    }
}
