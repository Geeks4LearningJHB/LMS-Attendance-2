package com.geeks.AttendanceSpringBootBackend.service.impl;

import com.geeks.AttendanceSpringBootBackend.entity.AttendanceRecord;
import com.geeks.AttendanceSpringBootBackend.entity.dto.AttendanceRequestDto;
import com.geeks.AttendanceSpringBootBackend.entity.dto.AttendanceResponseDto;
import com.geeks.AttendanceSpringBootBackend.service.AttendanceMapperInterface;
import org.springframework.stereotype.Service;


@Service
public class AttendanceMapperImplementation implements AttendanceMapperInterface {


  //Converting my Attendance Entity to ResponseDTO
    @Override
    public AttendanceResponseDto mapToDto(AttendanceRecord attendanceRecord) {

        AttendanceResponseDto dto = new AttendanceResponseDto();
        dto.setId(attendanceRecord.getId());
        dto.setStatus(attendanceRecord.getStatus());
        dto.setLogInTime(attendanceRecord.getLogInTime());
        dto.setDate(attendanceRecord.getDate());
        dto.setUserId(attendanceRecord.getUserId());
        dto.setLogInLocation(attendanceRecord.getLogInLocation());
        dto.setLogOutTime(attendanceRecord.getLogOutTime());

        return dto;

    }


    //Convert the requestDto to an Attendance Entity
    @Override
    public AttendanceRecord mapTOEntity(AttendanceRequestDto requestDto) {

        AttendanceRecord attendanceRecord = new AttendanceRecord();

        attendanceRecord.setStatus(requestDto.getStatus());
        attendanceRecord.setLogInTime(requestDto.getLogInTime());
        attendanceRecord.setDate(requestDto.getDate());
        attendanceRecord.setLogInLocation(requestDto.getLogInLocation());
        attendanceRecord.setLogOutTime(requestDto.getLogOutTime());
        attendanceRecord.setDate(requestDto.getDate());
        return attendanceRecord;
    }
}
