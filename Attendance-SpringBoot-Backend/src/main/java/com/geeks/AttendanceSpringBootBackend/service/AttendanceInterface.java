package com.geeks.AttendanceSpringBootBackend.service;

import com.geeks.AttendanceSpringBootBackend.entity.AttendanceRecord;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface AttendanceInterface {

     AttendanceRecord[] attendanceList();
     AttendanceRecord newAttendance (AttendanceRecord attendance);


}
