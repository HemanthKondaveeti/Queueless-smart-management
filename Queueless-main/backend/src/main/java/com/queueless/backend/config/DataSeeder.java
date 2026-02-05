package com.queueless.backend.config;

import com.queueless.backend.model.Department;
import com.queueless.backend.model.ServiceCenter;
import com.queueless.backend.repository.ServiceCenterRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final ServiceCenterRepository serviceCenterRepository;

    @Override
    public void run(String... args) {
        ServiceCenter hospital = ServiceCenter.builder()
                .name("CityCare Hospital")
                .build();

        Department ortho = Department.builder()
                .name("Orthopedics")
                .maxSlots(20)
                .avgServiceTime(15)
                .serviceCenter(hospital)
                .build();

        Department cardio = Department.builder()
                .name("Cardiology")
                .maxSlots(10)
                .avgServiceTime(20)
                .serviceCenter(hospital)
                .build();

        hospital.setDepartments(List.of(ortho, cardio));
        serviceCenterRepository.save(hospital);
    }
}
