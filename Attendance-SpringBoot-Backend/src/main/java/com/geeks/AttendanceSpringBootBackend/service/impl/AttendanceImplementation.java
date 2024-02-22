package com.geeks.AttendanceSpringBootBackend.service.impl;

import com.geeks.AttendanceSpringBootBackend.entity.AttendanceRecord;
import com.geeks.AttendanceSpringBootBackend.entity.Leave;
import com.geeks.AttendanceSpringBootBackend.entity.User;
import com.geeks.AttendanceSpringBootBackend.entity.dto.AttendanceRequestDto;
import com.geeks.AttendanceSpringBootBackend.entity.dto.AttendanceResponseDto;
import com.geeks.AttendanceSpringBootBackend.enums.Status;
import com.geeks.AttendanceSpringBootBackend.repository.AttendanceRepository;
import com.geeks.AttendanceSpringBootBackend.repository.UserRepository;
import com.geeks.AttendanceSpringBootBackend.service.AttendanceInterface;
import com.geeks.AttendanceSpringBootBackend.service.LeaveInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AttendanceImplementation implements AttendanceInterface {

    @Autowired
    private AttendanceRepository attendanceRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    AttendanceDtoMapper attendanceDtoMapper;
    @Autowired
    LeaveInterface leaveInterface;
    @Override
    public List<AttendanceResponseDto> attendanceList() {

        List<AttendanceResponseDto> attendanceRecords = attendanceRepository.findAll()
                .stream()
                .map(attendanceDtoMapper::mapToDto)
                .collect(Collectors.toList());

        return attendanceRecords;
    }

    @Override
    public AttendanceResponseDto newAttendance(AttendanceRequestDto requestDto) {

        LocalTime afterTime = LocalTime.of(9, 0); //If the user doesnt' log in before 09h00 then will return as absent
        LocalTime clockInTime = LocalTime.of(7 , 30);

        //Mapping my attendanceRequest to attendance entity
        AttendanceRecord attendanceRecord =   attendanceDtoMapper.mapTOEntity(requestDto);

        //check if user exists
        User user= userRepository.findById(requestDto.getUserId())
                .orElseThrow(()-> new IllegalStateException("User not found"));
        attendanceRecord.setUserId(user);

        //Check log in time
        if (attendanceRecord.getLogInTime().isAfter(clockInTime)
                && leaveInterface.onLeaveUser(user.getUserId()) == null) {

            attendanceRecord.setStatus(Status.LATE);

        }

        //check is_onLeave
        //if user logs in  , in the office the onLeave method must not get executed
    ;

       if ( leaveInterface.onLeaveUser(user.getUserId()) != null){
          attendanceRecord.setStatus(Status.ON_LEAVE);
       }
       else {
           attendanceRecord.setStatus(Status.ABSENT);
       }
        //create log out time from the log in time


        //check location


        //save attendance and store to newAttendanceRecord
        AttendanceRecord newAttendanceRecord = attendanceRepository.save(attendanceRecord);
        //Converting the new record to a response
        return attendanceDtoMapper.mapToDto(newAttendanceRecord);
    }
}
