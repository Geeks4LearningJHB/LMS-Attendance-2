package com.geeks.AttendanceSpringBootBackend.controller;

import com.geeks.AttendanceSpringBootBackend.entity.AttendanceRecord;
import com.geeks.AttendanceSpringBootBackend.entity.dto.AttendanceRequestDto;
import com.geeks.AttendanceSpringBootBackend.entity.dto.AttendanceResponseDto;
import com.geeks.AttendanceSpringBootBackend.service.AttendanceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/attendance")
public class AttendanceRecController {

    @Autowired
    private AttendanceInterface attendanceInterface;

    @PostMapping
    public AttendanceResponseDto addNewAttendance(@RequestBody AttendanceRequestDto attendanceRecord){

        System.out.println(attendanceRecord.toString());
        return attendanceInterface.newAttendance(attendanceRecord);


    }
    @GetMapping
    public List<AttendanceResponseDto> attendanceRecord(){

        return attendanceInterface.attendanceList();
    }


}
