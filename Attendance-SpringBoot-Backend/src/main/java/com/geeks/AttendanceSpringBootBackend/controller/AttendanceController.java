package com.geeks.AttendanceSpringBootBackend.controller;

import com.geeks.AttendanceSpringBootBackend.entity.User;
import com.geeks.AttendanceSpringBootBackend.entity.dto.AttendanceRequestDto;
import com.geeks.AttendanceSpringBootBackend.entity.dto.AttendanceResponseDto;
import com.geeks.AttendanceSpringBootBackend.service.AttendanceInterface;
import com.geeks.AttendanceSpringBootBackend.service.IpAdressInterface;
import com.geeks.AttendanceSpringBootBackend.service.impl.LogOutTimeImplimentation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@RestController
@RequestMapping("/attendance")
public class AttendanceController {

    @Autowired
    private AttendanceInterface attendanceInterface;
    @Autowired
    private IpAdressInterface ipAdressInterface;

    @PostMapping("/create")
    public ResponseEntity<AttendanceResponseDto> addNewAttendance(@RequestBody User user){

        AttendanceResponseDto attendanceResponseDto =attendanceInterface.newAttendance(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(attendanceResponseDto);
    }
    @GetMapping("/view-all")
    public List<AttendanceResponseDto> attendanceRecord(){

        return attendanceInterface.attendanceList();
    }


    @GetMapping("/today/{date}")

    public AttendanceResponseDto[] attendancesForToday (@PathVariable LocalDate date){

        return attendanceInterface.deadlineChecker(date);
    }

    @GetMapping("/test-ip")
    public String getIp(){
        return ipAdressInterface.getSystemIp();
    }

    @GetMapping("/logout-time")
    public ResponseEntity<String> getLogOutTime(@PathVariable LocalTime localTime){
        LogOutTimeImplimentation logOutTimeImplimentation = new LogOutTimeImplimentation();
        String logOutTime = String.valueOf(logOutTimeImplimentation.checkOutTimeCreation(localTime));
        return ResponseEntity.ok(logOutTime);

    }

}

