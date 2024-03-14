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
        //get time and date from the APi and break it into date and time
        String dateTime  =  timeFetcherApi.getCurrentTimeInSouthAfrica();
        String time  = dateTime.substring(dateTime.lastIndexOf('/') + 1);
        String date  = dateTime.substring(0, dateTime.lastIndexOf('/'));

        //format date and time to the localDate pattern
        LocalTime currentTime = LocalTime.parse(time , formatter);

        LocalDate currentDate = LocalDate.parse(date , formatDate);

        AttendanceRecord attendanceRecord = new AttendanceRecord();
        AttendanceRecord newAttendanceRecord;

        String logInIp =   ipAdressInterface.getLocation();
        List<User> users = userRepository.findAll();
        LocalDate testingDate = LocalDate.now().plusDays(1);

        AttendanceRecord currentDateAttendance = attendanceRepository
               .findByUserIdUserIdAndDate(user.getUserId() , currentDate);

        //check if user exists
        User logInUser= userRepository.findById(user.getUserId())
                .orElseThrow(()-> new IllegalStateException("User not found"));
        attendanceRecord.setUserId(logInUser);

        //check if the user has attendance record for that day
        if (currentDateAttendance == null){

            if (logInIp.equals("Office")){
                attendanceRecord.setLogInTime(currentTime);
                attendanceRecord.setDate(currentDate);
                logger.info("testing date:" + attendanceRecord.getDate());
                attendanceRecord.setLogInLocation(logInIp);
                attendanceRecord.setCheckOutTime(logOutTimeImplimentation.checkOutTimeCreation(attendanceRecord.getLogInTime()));


                if(loginTimeChecker.isPresent(attendanceRecord.getLogInTime()) ){
                    attendanceRecord.setStatus(Status.PRESENT);
                }
                else{
                    attendanceRecord.setStatus(Status.LATE);
                }
                //save the atendance and return it
                newAttendanceRecord = attendanceRepository.save(attendanceRecord);
                return attendanceDtoMapper.mapToDto(newAttendanceRecord);

            }
            else {
                throw new AttendanceExceptions("User not in the Office");
            }
        }else {
            throw new AttendanceExceptions("Attendance already exists for :" + logInUser.getUserName());
        }

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

    //Update method     @Override
    @Override
    public AttendanceResponseDto updateAttendanceRecord(long id, String status) {
        Optional<AttendanceRecord> attendanceRecordOptional = attendanceRepository.findById(id);
        if (attendanceRecordOptional.isPresent()) {
            AttendanceRecord attendanceRecord = attendanceRecordOptional.get();
            attendanceRecord.setStatus(Status.valueOf(status));
            attendanceRepository.save(attendanceRecord);
            AttendanceRecord updatedAttendanceRecord = attendanceRepository.save(attendanceRecord);
            return attendanceDtoMapper.mapToDto(updatedAttendanceRecord);
        }
            else{

                throw new AttendanceExceptions("Attendance not found");
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
    public List<AttendanceResponseDto> getAllUserAttendances(long userId) {

         List<AttendanceRecord> attendanceRecords  =  attendanceRepository.findByUserIdUserId(userId);
         return attendanceDtoMapper.mapToResponseDtoList(attendanceRecords);

    }

    @Override
    public List<AttendanceResponseDto> getTodayAttendance(LocalDate date) {

        List<AttendanceRecord> attendanceRecords  =  attendanceRepository.findAttendanceByDate(date);
        return attendanceDtoMapper.mapToResponseDtoList(attendanceRecords);


    }

    @Override
    public AttendanceResponseDto updateLogOutTime(long id , LocalTime logOutTime) {
        Optional<AttendanceRecord> attendanceRecordOptional = attendanceRepository.findById(id);
        if (attendanceRecordOptional.isPresent()) {
            AttendanceRecord attendanceRecord = attendanceRecordOptional.get();
            if (attendanceRecord.getLogOutTime() != null) {
                throw new AttendanceExceptions("Log out time already set");
            }
            attendanceRecord.setLogOutTime(logOutTime);
            attendanceRepository.save(attendanceRecord);
            AttendanceRecord updatedAttendanceRecord = attendanceRepository.save(attendanceRecord);
            return attendanceDtoMapper.mapToDto(updatedAttendanceRecord);
        }
        else{
            throw  new AttendanceExceptions("Attendance not found");
        }

    }


}