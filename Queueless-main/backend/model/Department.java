package com.queueless.backend.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Department {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @ManyToOne
    @JoinColumn(name = "service_center_id")
    private ServiceCenter serviceCenter;

    @OneToMany(mappedBy = "department", cascade = CascadeType.ALL)
    private List<TimeSlot> timeSlots;
}
