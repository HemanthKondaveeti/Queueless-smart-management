package com.queueless.backend.repository;

import com.queueless.backend.model.ServiceCenter;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ServiceCenterRepository extends JpaRepository<ServiceCenter, Long> {}
