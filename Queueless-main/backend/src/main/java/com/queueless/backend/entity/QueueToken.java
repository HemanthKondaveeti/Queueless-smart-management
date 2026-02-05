
package com.queueless.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

import com.queueless.backend.model.Department;
import com.queueless.backend.model.ServiceCenter;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QueueToken {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String tokenNumber;
    private LocalDateTime bookingTime;
    private LocalDateTime estimatedServeTime;

    @ManyToOne
    private User user;

    @ManyToOne
@JoinColumn(name = "department_id")
private Department department;

@ManyToOne
@JoinColumn(name = "service_center_id")
private ServiceCenter serviceCenter;

@Enumerated(EnumType.STRING)
private TokenStatus status;
}
