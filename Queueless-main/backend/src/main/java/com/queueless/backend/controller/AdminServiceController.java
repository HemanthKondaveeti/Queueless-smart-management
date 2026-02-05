package com.queueless.backend.controller;

import com.queueless.backend.dto.ServiceDto;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/admin/services")
public class AdminServiceController {

    // Fake storage - for in-memory testing only
    private final List<ServiceDto> fakeStorage = new ArrayList<>();

    /**
     * Save a single service (not a list!)
     */
    @PostMapping
    public void saveService(@RequestBody ServiceDto service) {
        // Remove any existing service with same name
        fakeStorage.removeIf(s -> s.getName().equalsIgnoreCase(service.getName()));

        fakeStorage.add(service);
    }

    /**
     * Get all saved services
     */
    @GetMapping
    public List<ServiceDto> getServices() {
        return fakeStorage;
    }
}
