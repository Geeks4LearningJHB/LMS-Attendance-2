package com.geeks.AttendanceSpringBootBackend.service.impl;

import com.geeks.AttendanceSpringBootBackend.entity.AttendanceRecord;
import com.geeks.AttendanceSpringBootBackend.entity.UserDummy;
import com.geeks.AttendanceSpringBootBackend.entity.dto.AttendanceRequestDto;
import com.geeks.AttendanceSpringBootBackend.entity.dto.AttendanceResponseDto;
import com.geeks.AttendanceSpringBootBackend.repository.AttendanceRepository;
import com.geeks.AttendanceSpringBootBackend.repository.UserDummyRepository;
import com.geeks.AttendanceSpringBootBackend.service.AttendanceInterface;
import com.geeks.AttendanceSpringBootBackend.service.AttendanceMapperInterface;
import com.geeks.AttendanceSpringBootBackend.service.UserDummyInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AttendanceImplementation implements AttendanceInterface {

    @Autowired
    private AttendanceRepository attendanceRepository;
    @Autowired
    private AttendanceMapperInterface attendanceMapperInterface;
    @Autowired
    UserDummyRepository userDummyRepository;

    @Override
    public AttendanceRecord[] attendanceList() {
        return new AttendanceRecord[0];
    }

    @Override
    public AttendanceResponseDto newAttendance(AttendanceRequestDto attendance) {
        //Mapping my attendanceRequest to attendance entity
         AttendanceRecord attendanceRecord =   attendanceMapperInterface.mapTOEntity(attendance);

        UserDummy userDummy = userDummyRepository.findById(attendance.getUserId()).orElseThrow(()->
                new IllegalStateException("User not found"));
        attendanceRecord.setUserId(userDummy);
        AttendanceRecord newAttendanceRecord = attendanceRepository.save(attendanceRecord);

         //Converting the new record to a response
        return attendanceMapperInterface.mapToDto(newAttendanceRecord);
    }
}
