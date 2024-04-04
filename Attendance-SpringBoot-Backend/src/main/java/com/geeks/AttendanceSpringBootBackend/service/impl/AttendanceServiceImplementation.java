package com.geeks.AttendanceSpringBootBackend.service.impl;

import com.geeks.AttendanceSpringBootBackend.entity.AttendanceRecord;
import com.geeks.AttendanceSpringBootBackend.entity.User;
import com.geeks.AttendanceSpringBootBackend.entity.dto.AttendanceResponseDto;
import com.geeks.AttendanceSpringBootBackend.entity.dto.UserResponseDTO;
import com.geeks.AttendanceSpringBootBackend.enums.Status;
import com.geeks.AttendanceSpringBootBackend.exceptions.AttendanceExceptions;
import com.geeks.AttendanceSpringBootBackend.repository.AttendanceRepository;
import com.geeks.AttendanceSpringBootBackend.repository.UserRepository;
import com.geeks.AttendanceSpringBootBackend.service.AttendanceInterface;
import com.geeks.AttendanceSpringBootBackend.service.IpAdressInterface;
import com.geeks.AttendanceSpringBootBackend.service.UserInterface;
import com.sun.tools.javac.Main;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.*;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
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
    private UserInterface userInterface;


    @Autowired
    private CheckOutTimeImplimentation logOutTimeImplimentation;


    //Global Variablez
    static DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm");
    static DateTimeFormatter formatDate = DateTimeFormatter.ofPattern("MM/dd/yyyy");
    static String date;
    static String time;
    static LocalTime currentTime;
    static LocalDate currentDate;

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

        date  =  timeFetcherApi.getCurrentDateInSouthAfrica();
        time  = timeFetcherApi.getCurrentTimeInSouthAfrica();

        //format date and time to the localDate pattern
         currentTime = LocalTime.parse(time , formatter);
         currentDate = LocalDate.parse(date , formatDate);

        AttendanceRecord attendanceRecord = new AttendanceRecord();
        AttendanceRecord newAttendanceRecord;
        AttendanceResponseDto mappedAttendance = null;
       //String logInIp =  "41.140.81.0";
        String logInIp =   ipAdressInterface.getLocation();

        List<User> users = userRepository.findAll();
        LocalDate testingDate = LocalDate.now().plusDays(1);
        LocalTime testingTime = LocalTime.of(8 , 35);

        AttendanceRecord currentDateAttendance = attendanceRepository
               .findByUserIdUserIdAndDate(user.getUserId() , currentDate);

        //User exists if our system gets to this line
        attendanceRecord.setUserId(user);

        //check if the geek has attendance record for that day
        if (currentDateAttendance == null){

            if (logInIp.equals("Office") && user.getRole().equals("Learner") ){
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
                //save the atendance and return it
                newAttendanceRecord = attendanceRepository.save(attendanceRecord);
                mappedAttendance=     attendanceDtoMapper.mapToDto(newAttendanceRecord);
                return mappedAttendance;
            }
            else {

                AttendanceRecord attendanceRecord1 = new AttendanceRecord();
                attendanceRecord1.setUserId(user);
                attendanceRecord1.setLogInTime(currentTime);
                attendanceRecord1.setDate(currentDate);
                attendanceRecord1.setLogInLocation(logInIp);

                AttendanceResponseDto noneSavedAttendance;
                noneSavedAttendance = attendanceDtoMapper.mapToDto(attendanceRecord1);
                return noneSavedAttendance;

            }
        }else {
            return attendanceDtoMapper.mapToDto(currentDateAttendance);
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
    public List<AttendanceResponseDto> getTodayAttendance() {
        date  =  timeFetcherApi.getCurrentDateInSouthAfrica();
        currentDate = LocalDate.parse(date , formatDate);
        List<AttendanceRecord> attendanceRecords  =  attendanceRepository.findAttendanceByDate(currentDate);
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
    @Override
    public AttendanceResponseDto scannedQr(long attendanceId){
        Optional<AttendanceRecord> attendanceRecordOptional = attendanceRepository.findById(attendanceId);
        if (attendanceRecordOptional.isPresent()) {
            AttendanceRecord attendanceRecord = attendanceRecordOptional.get();
            if (attendanceRecord.isScanned()){
                throw new AttendanceExceptions("Already scanned");
            }
            attendanceRecord.setScanned(true);
            attendanceRepository.save(attendanceRecord);
            AttendanceRecord updatedAttendanceRecord = attendanceRepository.save(attendanceRecord);
            return attendanceDtoMapper.mapToDto(updatedAttendanceRecord);
        }
        else{
            throw  new AttendanceExceptions("Attendance not found");
        }
    }
    // Improve( having same method on check out implementation)
    private boolean isEarlyLogOut(AttendanceRecord attendanceRecord) {
       return logOutTimeImplimentation.logOutBeforeExpected(attendanceRecord.getUserId().getUserId());
    }

    @Override
    public List<AttendanceResponseDto> getAllEarlyLogOutTimes() {

        date  =  timeFetcherApi.getCurrentDateInSouthAfrica();
        currentDate = LocalDate.parse(date , formatDate);

        LocalDate yesterdaysDate;
        yesterdaysDate = currentDate.minusDays(1);

        return allEarly(yesterdaysDate);
    }


    public List<AttendanceResponseDto> allEarly(LocalDate date) {
        List<AttendanceRecord> records = attendanceRepository.findAttendanceByDate(date);
        List<AttendanceRecord> earlyLogOuts = new ArrayList<AttendanceRecord>();

        for (AttendanceRecord attRecords : records) {
            if (attRecords.isScanned() && attRecords.getLogOutTime()
                    .isBefore(attRecords.getCheckOutTime())) {

                earlyLogOuts.add(attRecords);
            }
        }
        return attendanceDtoMapper.mapToResponseDtoList(earlyLogOuts);
    }

    @Override
    public List<UserResponseDTO> absentGeeks(LocalTime time, LocalDate date) {

        LocalTime checkTime = LocalTime.of(7 ,30);

        if ((time.isAfter(checkTime) &&time.isBefore(LocalTime.of(17,30)))){
            List<UserResponseDTO> allGeeks = userInterface.allGeeks();
            List<UserResponseDTO> absentGeeks = new ArrayList<UserResponseDTO>();
            for (UserResponseDTO geek : allGeeks) {

                AttendanceRecord todayRecord = attendanceRepository
                        .findByUserIdUserIdAndDate(geek.getUserId(), date);

                if (todayRecord == null) {
                    absentGeeks.add(geek);
                }
            }
            return absentGeeks;
        }
        return null;
    }
}