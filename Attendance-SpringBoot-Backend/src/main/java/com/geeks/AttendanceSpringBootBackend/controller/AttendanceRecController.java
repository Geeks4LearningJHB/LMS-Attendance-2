package com.geeks.AttendanceSpringBootBackend.controller;

import com.geeks.AttendanceSpringBootBackend.entity.AttendanceRecord;
import com.geeks.AttendanceSpringBootBackend.service.impl.AttendanceImplementation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/attendance")
public class AttendanceRecController {

    @Autowired
    private AttendanceImplementation attendanceImplementation;

    @PostMapping
    public AttendanceRecord addNewAttendance(@RequestBody AttendanceRecord attendanceRecord){

        System.out.println(attendanceRecord.toString());
        return attendanceImplementation.newAttendance(attendanceRecord);


    }

}
