package com.geeks.AttendanceSpringBootBackend.service;

import com.geeks.AttendanceSpringBootBackend.entity.AttendanceRecord;
import com.geeks.AttendanceSpringBootBackend.entity.dto.AttendanceRequestDto;
import com.geeks.AttendanceSpringBootBackend.entity.dto.AttendanceResponseDto;

public interface AttendanceMapperInterface {
    AttendanceResponseDto mapToDto(AttendanceRecord attendanceRecord);
    AttendanceRecord mapTOEntity(AttendanceRequestDto attendanceRequestDto);
}
