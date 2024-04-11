package com.geeks.AttendanceSpringBootBackend.service;

import com.geeks.AttendanceSpringBootBackend.entity.AttendanceRecord;
import com.geeks.AttendanceSpringBootBackend.entity.User;
import com.geeks.AttendanceSpringBootBackend.entity.dto.AttendanceRequestDto;
import com.geeks.AttendanceSpringBootBackend.entity.dto.AttendanceResponseDto;
import com.geeks.AttendanceSpringBootBackend.entity.dto.UserResponseDTO;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Date;
import java.util.List;


public interface AttendanceInterface {

     List<AttendanceResponseDto> attendanceList();
     AttendanceResponseDto newAttendance (User user);
     AttendanceResponseDto getAttendanceRecordById(long id);
     AttendanceResponseDto updateAttendanceRecord(long id, String status);
     List<AttendanceResponseDto> getAllAttendanceRecords();
     void deleteAttendanceRecord(long id);
     List<AttendanceResponseDto> getAllUserAttendances(long userId);

     List<AttendanceResponseDto> getTodayAttendance();
     AttendanceResponseDto updateLogOutTime(long id ,LocalTime logOutTime);
     AttendanceResponseDto scannedQr(long attendanceId);
     List<AttendanceResponseDto> getAllEarlyLogOutTimes();
     List<UserResponseDTO> absentGeeks();
     List<AttendanceResponseDto> getUserEarlyLogOut(long userId);

     List<AttendanceResponseDto> getAbsentUserDays(long userId);
}
