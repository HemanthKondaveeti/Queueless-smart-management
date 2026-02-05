package com.queueless.backend.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

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

    private Integer maxSlots;
    private Integer avgServiceTime;

    @ManyToOne
    @JoinColumn(name = "service_center_id")
    @JsonIgnore
    private ServiceCenter serviceCenter;

    @OneToMany(mappedBy = "department", cascade = CascadeType.ALL)
    private List<TimeSlot> timeSlots;
}
