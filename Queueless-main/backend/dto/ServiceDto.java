package com.queueless.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ServiceDto {
    private String name;
    private List<DepartmentDto> departments;
}
