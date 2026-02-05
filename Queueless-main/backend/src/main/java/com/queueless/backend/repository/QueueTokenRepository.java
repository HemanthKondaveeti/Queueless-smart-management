package com.queueless.backend.repository;

import com.queueless.backend.entity.QueueToken;
import com.queueless.backend.entity.TokenStatus;
import com.queueless.backend.model.Department;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface QueueTokenRepository extends JpaRepository<QueueToken, Long> {
    Optional<QueueToken> findTopByDepartmentOrderByBookingTimeDesc(Department department);
    List<QueueToken> findByDepartmentAndStatus(Department department, TokenStatus status);
}
