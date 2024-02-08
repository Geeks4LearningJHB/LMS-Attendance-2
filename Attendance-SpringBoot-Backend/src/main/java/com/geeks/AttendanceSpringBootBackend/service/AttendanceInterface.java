package com.geeks.AttendanceSpringBootBackend.service;

import com.geeks.AttendanceSpringBootBackend.entity.AttendanceRecord;
import com.geeks.AttendanceSpringBootBackend.entity.dto.AttendanceRequestDto;
import com.geeks.AttendanceSpringBootBackend.entity.dto.AttendanceResponseDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface AttendanceInterface {

     AttendanceRecord[] attendanceList();
     AttendanceResponseDto newAttendance (AttendanceRequestDto attendance);


}
