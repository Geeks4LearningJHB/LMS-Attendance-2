package com.geeks.AttendanceSpringBootBackend.service;

import com.geeks.AttendanceSpringBootBackend.entity.AttendanceRecord;
import com.geeks.AttendanceSpringBootBackend.entity.dto.AttendanceRequestDto;
import com.geeks.AttendanceSpringBootBackend.entity.dto.AttendanceResponseDto;
import org.springframework.stereotype.Service;

import java.util.List;


public interface AttendanceInterface {

     List<AttendanceResponseDto> attendanceList();
     AttendanceResponseDto newAttendance (AttendanceRequestDto attendance);
     AttendanceResponseDto getAttendanceRecordById(long id);
     AttendanceResponseDto updateAttendanceRecord(long id, AttendanceRequestDto requestDTO);
     List<AttendanceResponseDto> getAllAttendanceRecords();
    void deleteAttendanceRecord(long id);
}
