package com.geeks.AttendanceSpringBootBackend.service.impl;

import com.geeks.AttendanceSpringBootBackend.entity.AttendanceRecord;
import com.geeks.AttendanceSpringBootBackend.entity.dto.AttendanceRequestDto;
import com.geeks.AttendanceSpringBootBackend.entity.dto.AttendanceResponseDto;
import com.geeks.AttendanceSpringBootBackend.service.AttendanceMapperInterface;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AttendanceMapperServiceImpl implements AttendanceMapperInterface {

    //Converting my Attendance Entity to ResponseDTO

    public AttendanceResponseDto mapToDto(AttendanceRecord attendanceRecord) {

        AttendanceResponseDto dto = new AttendanceResponseDto();
        dto.setId(attendanceRecord.getId());
        dto.setUserId(attendanceRecord.getUserId());
        dto.setStatus(attendanceRecord.getStatus());
        dto.setLogInTime(attendanceRecord.getLogInTime());
        dto.setDate(attendanceRecord.getDate());
        dto.setLogInLocation(attendanceRecord.getLogInLocation());
        dto.setCheckOutTime(attendanceRecord.getCheckOutTime());
        //dto.setName(attendanceRecord.get);
//        dto.setSurname(attendanceRecord.getUserId().getLastname());
//        dto.setSponsor(attendanceRecord.getUserId().getSponsorId());
//        dto.setLogOutTime(attendanceRecord.getLogOutTime());
//        dto.setRole(attendanceRecord.getUserId().getRole());
        dto.setScanned(attendanceRecord.isScanned());
        return dto;
    }
    //Convert the requestDto to an Attendance Entity
    public AttendanceRecord mapTOEntity(AttendanceRequestDto requestDto) {
        AttendanceRecord attendanceRecord = new AttendanceRecord();
        attendanceRecord.setLogInTime(requestDto.getLogInTime());
        attendanceRecord.setDate(requestDto.getDate());
        attendanceRecord.setLogInLocation(requestDto.getLogInLocation());
        attendanceRecord.setCheckOutTime(requestDto.getCheckOutTime());
        attendanceRecord.setStatus(requestDto.getStatus());


        return attendanceRecord;
    }
    public List<AttendanceResponseDto> mapToResponseDtoList(List<AttendanceRecord> attendanceRecords) {
        return attendanceRecords.stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }


}
