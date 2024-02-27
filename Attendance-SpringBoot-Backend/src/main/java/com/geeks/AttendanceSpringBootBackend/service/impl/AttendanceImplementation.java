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
import com.geeks.AttendanceSpringBootBackend.service.IpAdressInterface;
import com.geeks.AttendanceSpringBootBackend.service.LeaveInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.net.UnknownHostException;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.temporal.ChronoUnit;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
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
    LoginTimeChecker loginTimeChecker;
    @Autowired
    LeaveInterface leaveInterface;
    @Autowired
    IpAdressInterface ipAdressInterface;


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
        LocalTime expectedLogOutTime ;
        //Mapping my attendanceRequest to attendance entity
        AttendanceRecord attendanceRecord =   attendanceDtoMapper.mapTOEntity(requestDto);
        //check if user exists
        User user= userRepository.findById(requestDto.getUserId())
                .orElseThrow(()-> new IllegalStateException("User not found"));
        attendanceRecord.setUserId(user);

      String logInIp =   ipAdressInterface.getLocation(attendanceRecord.getLogInLocation());

        //(re-visit) if user logs in  , in the office the onLeave method must not get executed

            if (leaveInterface.isOnLeave(user.getUserId())) {
                attendanceRecord.setStatus(Status.ON_LEAVE);

                //check location
            } else if (logInIp.equals("Office")) {
                //Check log in time
                if (loginTimeChecker.isLate(attendanceRecord.getLogInTime())) {
                    attendanceRecord.setStatus(Status.LATE);
                } else if (loginTimeChecker.isPresent(attendanceRecord.getLogInTime())) {
                    attendanceRecord.setStatus(Status.PRESENT);
                } else {
                    attendanceRecord.setStatus(Status.ABSENT);
                }
            } else {
                attendanceRecord.setStatus(Status.ABSENT);
            }
        //create log out time from the log in time
            expectedLogOutTime = attendanceRecord.getLogInTime().plusHours(9);
                     System.out.println(expectedLogOutTime);
                if (attendanceRecord.getLogOutTime().isBefore(expectedLogOutTime)){
                    long oweTime = Math.abs(ChronoUnit.MINUTES.between(attendanceRecord.getLogOutTime(), expectedLogOutTime));
                    System.out.println("Yo owe us :" + "" + oweTime + " minutes");
                }


        //save attendance and store to newAttendanceRecord
        AttendanceRecord newAttendanceRecord = attendanceRepository.save(attendanceRecord);
        //Converting the new record to a response
        if (attendanceRecord != null){
            return attendanceDtoMapper.mapToDto(newAttendanceRecord);
        }
       return null;
    }

    //search record
    @Override
    public AttendanceResponseDto getAttendanceRecordById(long id) {
        Optional<AttendanceRecord> attendanceRecordOptional = attendanceRepository.findById(id);
        if (attendanceRecordOptional.isPresent()) {

            return  attendanceDtoMapper.mapToDto(attendanceRecordOptional.get());
        } else {
            // handle not found scenario
            return null;
        }
    }

    @Override
    //Update method
    public AttendanceResponseDto updateAttendanceRecord(long id, AttendanceRequestDto requestDTO) {
        Optional<AttendanceRecord> attendanceRecordOptional = attendanceRepository.findById(id);
        if (attendanceRecordOptional.isPresent()) {
            AttendanceRecord attendanceRecord = attendanceRecordOptional.get();
            // Assuming userId cannot be updated
            attendanceRecord = attendanceDtoMapper.mapTOEntity(requestDTO);

            AttendanceRecord updatedRecord = attendanceRepository.save(attendanceRecord);
            return attendanceDtoMapper.mapToDto(updatedRecord);
        } else {
            // handle not found scenario
            return null;
        }
    }

    @Override
    public List<AttendanceResponseDto> getAllAttendanceRecords() {
        return null;
    }

    @Override
    // Delete operation
    public void deleteAttendanceRecord(long id) {
        attendanceRepository.deleteById(id);
    }
    @Override
    public AttendanceResponseDto[] deadlineChecker(LocalDate systemDate){
        List<AttendanceResponseDto> allAttendancesForToday = attendanceRepository.findAttendanceByDate(systemDate);
        AttendanceResponseDto[] arr = new AttendanceResponseDto[allAttendancesForToday.size()];
        return allAttendancesForToday.toArray(arr);
    }


}