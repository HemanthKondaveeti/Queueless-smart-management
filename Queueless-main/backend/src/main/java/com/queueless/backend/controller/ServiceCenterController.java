package com.queueless.backend.controller;

import com.queueless.backend.model.ServiceCenter;
import com.queueless.backend.repository.ServiceCenterRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/services")
@RequiredArgsConstructor
public class ServiceCenterController {

    private final ServiceCenterRepository serviceCenterRepository;

    @GetMapping
    public List<ServiceCenter> getAllServiceCenters() {
        return serviceCenterRepository.findAll();
    }
}
