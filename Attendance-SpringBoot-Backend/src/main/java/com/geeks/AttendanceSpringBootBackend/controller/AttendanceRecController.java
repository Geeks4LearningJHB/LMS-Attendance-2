package com.geeks.AttendanceSpringBootBackend.controller;

import com.geeks.AttendanceSpringBootBackend.entity.AttendanceRecord;
import com.geeks.AttendanceSpringBootBackend.entity.dto.AttendanceRequestDto;
import com.geeks.AttendanceSpringBootBackend.entity.dto.AttendanceResponseDto;
import com.geeks.AttendanceSpringBootBackend.service.AttendanceInterface;
import com.geeks.AttendanceSpringBootBackend.service.IpAdressInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/attendance")
public class AttendanceRecController {

    @Autowired
    private AttendanceInterface attendanceInterface;
    @Autowired
    IpAdressInterface ipAdressInterface;

    @PostMapping
    public ResponseEntity<AttendanceResponseDto> addNewAttendance(@RequestBody AttendanceRequestDto attendanceRecord){

        System.out.println(attendanceRecord.toString());
        AttendanceResponseDto attendanceResponseDto =attendanceInterface.newAttendance(attendanceRecord);
        return ResponseEntity.status(HttpStatus.CREATED).body(attendanceResponseDto);

    }
    @GetMapping
    public List<AttendanceResponseDto> attendanceRecord(){

        return attendanceInterface.attendanceList();
    }

    @PostMapping("/ip")
    public String  testIp(@RequestBody String ip){

        return ipAdressInterface.getLocation(ip);
    }

    @GetMapping("/today")

    public List<AttendanceResponseDto>  attendancesForToday (@RequestBody LocalDate date){

        return attendanceInterface.deadlineChecker(date);
    }

}
