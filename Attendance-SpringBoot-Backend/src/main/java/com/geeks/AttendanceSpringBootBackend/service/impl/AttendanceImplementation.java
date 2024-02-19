package com.geeks.AttendanceSpringBootBackend.service.impl;

import com.geeks.AttendanceSpringBootBackend.entity.AttendanceRecord;
import com.geeks.AttendanceSpringBootBackend.repository.AttendanceRepository;
import com.geeks.AttendanceSpringBootBackend.service.AttendanceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AttendanceImplementation implements AttendanceInterface {

    @Autowired
    private AttendanceRepository attendanceRepository;
    @Override
    public AttendanceRecord[] attendanceList() {
        return new AttendanceRecord[0];
    }

    @Override
    public AttendanceRecord newAttendance(AttendanceRecord attendance) {
        return attendanceRepository.save(attendance);
    }
}
