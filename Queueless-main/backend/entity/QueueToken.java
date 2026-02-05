
package com.queueless.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

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

    private String department;
    private String serviceCenterName;
    private String status; // QUEUED, SERVED, MISSED
}
