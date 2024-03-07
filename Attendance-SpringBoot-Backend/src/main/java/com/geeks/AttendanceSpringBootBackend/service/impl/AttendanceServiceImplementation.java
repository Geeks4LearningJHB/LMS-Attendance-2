package com.geeks.AttendanceSpringBootBackend.service.impl;

import com.geeks.AttendanceSpringBootBackend.entity.AttendanceRecord;
import com.geeks.AttendanceSpringBootBackend.entity.User;
import com.geeks.AttendanceSpringBootBackend.entity.dto.AttendanceRequestDto;
import com.geeks.AttendanceSpringBootBackend.entity.dto.AttendanceResponseDto;
import com.geeks.AttendanceSpringBootBackend.enums.Status;
import com.geeks.AttendanceSpringBootBackend.exceptions.AttendanceExceptions;
import com.geeks.AttendanceSpringBootBackend.repository.AttendanceRepository;
import com.geeks.AttendanceSpringBootBackend.repository.UserRepository;
import com.geeks.AttendanceSpringBootBackend.service.AttendanceInterface;
import com.geeks.AttendanceSpringBootBackend.service.IpAdressInterface;
import com.sun.tools.javac.Main;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.*;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AttendanceServiceImplementation implements AttendanceInterface {
    private static final Logger logger = LogManager.getLogger(Main.class);

    @Autowired
    private AttendanceRepository attendanceRepository;
    @Autowired
    private  UserRepository userRepository;
    @Autowired
    private AttendanceMapperServiceImpl attendanceDtoMapper;
    @Autowired
    private LoginTimeChecker loginTimeChecker;
    @Autowired
    private IpAdressInterface ipAdressInterface;
    @Autowired
    private TimeFetcherApi timeFetcherApi;


    @Autowired
    private LogOutTimeImplimentation logOutTimeImplimentation;

    @Override
    public List<AttendanceResponseDto> attendanceList() {

        List<AttendanceResponseDto> attendanceRecords = attendanceRepository.findAll()
                .stream()
                .map(attendanceDtoMapper::mapToDto)
                .collect(Collectors.toList());

        return attendanceRecords;
    }

    @Override
    public AttendanceResponseDto newAttendance(User user) {

        LocalTime expectedLogOutTime ;
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm");
        DateTimeFormatter formatDate = DateTimeFormatter.ofPattern("MM/dd/yyyy");
        String dateTime  =  timeFetcherApi.getCurrentTimeInSouthAfrica();
        String time  = dateTime.substring(dateTime.lastIndexOf('/') + 1);
        String date  = dateTime.substring(0, dateTime.lastIndexOf('/'));

       LocalTime currentTime = LocalTime.parse(time);
       LocalDate currentDate = LocalDate.parse(date , formatDate);
       String formattedTime = currentTime.format(formatter);



        //Mapping my attendanceRequest to attendance entity
      //  AttendanceRecord attendanceRecord =   attendanceDtoMapper.mapTOEntity(requestDto);
        AttendanceRecord attendanceRecord = new AttendanceRecord();

        AttendanceRecord newAttendanceRecord;
        String logInIp =   ipAdressInterface.getLocation();

        //check if user exists
        User logInUser= userRepository.findById(user.getUserId())
                .orElseThrow(()-> new IllegalStateException("User not found"));
        attendanceRecord.setUserId(logInUser);

        if (logInIp.equals("Office")){

            attendanceRecord.setLogInTime(currentTime);
            attendanceRecord.setDate(currentDate);
            attendanceRecord.setLogInLocation(logInIp);
            attendanceRecord.setCheckOutTime(logOutTimeImplimentation.checkOutTimeCreation(attendanceRecord.getLogInTime()));


            if(loginTimeChecker.isPresent(attendanceRecord.getLogInTime()) ){
                attendanceRecord.setStatus(Status.PRESENT);
            }
            else{
                attendanceRecord.setStatus(Status.LATE);
            }
            newAttendanceRecord = attendanceRepository.save(attendanceRecord);
        }
        else {
            throw new AttendanceExceptions("User not attended");
        }

        return attendanceDtoMapper.mapToDto(newAttendanceRecord);
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