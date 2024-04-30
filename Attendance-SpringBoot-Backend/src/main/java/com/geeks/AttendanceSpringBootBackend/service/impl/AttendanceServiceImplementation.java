package com.geeks.AttendanceSpringBootBackend.service.impl;

import com.geeks.AttendanceSpringBootBackend.entity.AttendanceRecord;
import com.geeks.AttendanceSpringBootBackend.entity.dto.AttendanceResponseDto;
import com.geeks.AttendanceSpringBootBackend.entity.dto.Geek;
import com.geeks.AttendanceSpringBootBackend.entity.dto.SponsorDto;
import com.geeks.AttendanceSpringBootBackend.enums.Status;
import com.geeks.AttendanceSpringBootBackend.exceptions.AttendanceExceptions;
import com.geeks.AttendanceSpringBootBackend.exceptions.UserException;
import com.geeks.AttendanceSpringBootBackend.feign.UserFeignInterface;
import com.geeks.AttendanceSpringBootBackend.repository.AttendanceRepository;
import com.geeks.AttendanceSpringBootBackend.service.AttendanceInterface;
import com.geeks.AttendanceSpringBootBackend.service.IpAdressInterface;
import com.geeks.AttendanceSpringBootBackend.service.UserInterface;
import com.sun.tools.javac.Main;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
    private UserFeignInterface userFeignInterface;

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
    public AttendanceResponseDto newAttendance(Geek geek) {
        logger.info("Triggered");
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

       // List<User> users = userRepository.findAll();
//        LocalDate testingDate = LocalDate.now().plusDays(1);
//        LocalTime testingTime = LocalTime.of(8 , 35);

        AttendanceRecord currentDateAttendance = attendanceRepository
               .findByUserIdAndDate(geek.getUserId() , currentDate);

        //User exists if our system gets to this line
        attendanceRecord.setUserId(geek.getUserId());

        //check if the geek has attendance record for that day
        if (currentDateAttendance == null){

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
                //save the atendance and return it
                newAttendanceRecord = attendanceRepository.save(attendanceRecord);
                mappedAttendance=     attendanceDtoMapper.mapToDto(newAttendanceRecord);
                return mappedAttendance;
            }
            else {

                AttendanceRecord attendanceRecord1 = new AttendanceRecord();
                attendanceRecord1.setUserId(geek.getUserId());
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
    public List<AttendanceResponseDto> getAllUserAttendances(String userId) {

         List<AttendanceRecord> attendanceRecords  =  attendanceRepository.findAllByUserIdOrderByDateDesc(userId);
        System.out.println("Records");
        for (AttendanceRecord att : attendanceRecords){
             System.out.println(att);
         }
         return attendanceDtoMapper.mapToResponseDtoList(attendanceRecords);

    }

    @Override
    public List<AttendanceResponseDto> getTodayAttendance() {
        date  =  timeFetcherApi.getCurrentDateInSouthAfrica();
        currentDate = LocalDate.parse(date , formatDate);
        List<AttendanceRecord> attendanceRecords  =  attendanceRepository.findAttendanceByDateOrderByLogInTimeDesc(currentDate);
        List<AttendanceResponseDto> attendanceResponseDtos = attendanceDtoMapper.mapToResponseDtoList(attendanceRecords);

        for(int i=0;i<attendanceResponseDtos.size();i++){
            AttendanceResponseDto attendanceResponseDto = attendanceResponseDtos.get(i);

            String userId = attendanceResponseDto.getUserId();
            Geek geek = userFeignInterface.getGeekNameById(userId).getBody();
            attendanceResponseDto.setName(geek.getFirstname() +" "+geek.getLastname());

            SponsorDto sponsorDto = userFeignInterface.getSponsorNameByGeekId(userId).getBody();
            attendanceResponseDto.setSponsor(sponsorDto.getSponsorName());

            logger.info(geek.getFirstname());
        }


        return attendanceResponseDtos;


    }

    @Override
    public AttendanceResponseDto updateLogOutTime(long id) {
        Optional<AttendanceRecord> attendanceRecordOptional = attendanceRepository.findById(id);

        time  = timeFetcherApi.getCurrentTimeInSouthAfrica();
        //format date and time to the localDate pattern
        currentTime = LocalTime.parse(time , formatter);
        if (attendanceRecordOptional.isPresent()) {
            AttendanceRecord attendanceRecord = attendanceRecordOptional.get();
            if (attendanceRecord.getLogOutTime() != null && attendanceRecord.isScanned()) {
                throw new AttendanceExceptions("Log out time already set");
            }
            attendanceRecord.setLogOutTime(currentTime);
            attendanceRecord.setScanned(true);
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

    @Override
    public List<AttendanceResponseDto> getAllEarlyLogOutTimes() {

        date  =  timeFetcherApi.getCurrentDateInSouthAfrica();
        currentDate = LocalDate.parse(date , formatDate);
        LocalDate yesterdaysDate;


        if (currentDate.getDayOfWeek() == DayOfWeek.MONDAY) {
            yesterdaysDate = currentDate.minusDays(3);
        } else {
            yesterdaysDate = currentDate.minusDays(1);
        }

        return allEarly(yesterdaysDate);
    }

    public List<AttendanceResponseDto> allEarly(LocalDate date) {
        List<AttendanceRecord> records = attendanceRepository.findAttendanceByDateOrderByLogInTimeDesc(date);
        List<AttendanceResponseDto> earlyLogOuts = new ArrayList<>();

        List<AttendanceResponseDto> attendanceResponseDtos = attendanceDtoMapper.mapToResponseDtoList(records);

        for(int i=0;i<attendanceResponseDtos.size();i++){
            AttendanceResponseDto attendanceResponseDto = attendanceResponseDtos.get(i);
            String userId = attendanceResponseDto.getUserId();
            Geek geek = userFeignInterface.getGeekNameById(userId).getBody();
            attendanceResponseDto.setName(geek.getFirstname() +" "+geek.getLastname());
            SponsorDto sponsorDto = userFeignInterface.getSponsorNameByGeekId(userId).getBody();
            attendanceResponseDto.setSponsor(sponsorDto.getSponsorName());

            if (attendanceResponseDto.isScanned() && attendanceResponseDto.getLogOutTime() != null &&
                    attendanceResponseDto.getLogOutTime().isBefore(attendanceResponseDto.getCheckOutTime().minusMinutes(5))) {
                earlyLogOuts.add(attendanceResponseDto);
            }


        }


        return earlyLogOuts;
    }

    @Override
    public List<Geek> absentGeeks() {
        date  =  timeFetcherApi.getCurrentDateInSouthAfrica();
        time  = timeFetcherApi.getCurrentTimeInSouthAfrica();
        //format date and time to the localDate pattern
        currentTime = LocalTime.parse(time , formatter);
        currentDate = LocalDate.parse(date , formatDate);
        LocalTime checkTime = LocalTime.of(7 ,30);
        List<Geek> absentGeeks = new ArrayList<>();
        if ((currentTime.isAfter(checkTime) &&currentTime.isBefore(LocalTime.of(17,30)))){
            List<Geek> allGeeks = userFeignInterface.getAllGeeks().getBody();
            //run for each
            for (Geek geek : allGeeks) {
                AttendanceRecord todayRecord = attendanceRepository
                        .findByUserIdAndDate(geek.getUserId(),currentDate);
                logger.info(todayRecord);
                if (todayRecord == null) {
                    SponsorDto sponsorDto = userFeignInterface.getSponsorNameByGeekId(geek.getUserId()).getBody();
                    geek.setSponsor(sponsorDto.getSponsorName());
                    absentGeeks.add(geek);

                    logger.info("Number of absent : " + geek);
                }
            }
            return absentGeeks;
        }
        throw new UserException("Check after 07h30");
    }

    @Override
    public List<AttendanceResponseDto> getUserEarlyLogOut(String userId){
        List<AttendanceRecord> records = attendanceRepository.findByUserId(userId);
        List<AttendanceRecord> early = new ArrayList<>();

        for (AttendanceRecord record : records) {
            if (record.isScanned() && record.getLogOutTime()
                    .isBefore(record.getCheckOutTime().minusMinutes(5))) {
                early.add(record);
            }
        }
        return attendanceDtoMapper.mapToResponseDtoList(early);
    }

    public List<AttendanceResponseDto> getAbsentUserDays(String userId) {

        date  =  timeFetcherApi.getCurrentDateInSouthAfrica();

        //format date and time to the localDate pattern
        currentDate = LocalDate.parse(date , formatDate);

        List<AttendanceRecord> records = attendanceRepository.findByUserId(userId);
        List<LocalDate> absentDates = new ArrayList<>();

        for (AttendanceRecord record : records) {
            absentDates.add(record.getDate());
        }

       List<Geek> allGeeks = userFeignInterface.getAllGeeks().getBody();

        for (Geek geeks : allGeeks) {
            if(geeks.getUserId().equals(userId)) {
                LocalDate startOfContract = geeks.getLearnershipStartDate();
                LocalDate endOfContract = geeks.getLearnershipEndDate();
                LocalDate startOfWeek = startOfContract.with(DayOfWeek.MONDAY);
                LocalDate endOfWeek = startOfWeek.plusDays(4);
                LocalDate yesterday = currentDate.minusDays(1);

                List<AttendanceResponseDto> absentUsers = new ArrayList<>();

                for (LocalDate date = startOfWeek; date.isBefore(yesterday.plusDays(1)); date = date.plusDays(1)) {
                    if (date.isBefore(startOfContract) || date.isAfter(endOfContract)) {
                        continue; // Skip dates outside the contract period
                    }
                    if (date.getDayOfWeek() == DayOfWeek.SATURDAY || date.getDayOfWeek() == DayOfWeek.SUNDAY) {
                        continue; // Skip weekends
                    }
                    if (!absentDates.contains(date)) {
                        AttendanceResponseDto absentUser = new AttendanceResponseDto();
                        absentUser.setDate(date);
                        absentUser.setUserId(userId);
                        absentUsers.add(absentUser);
                    }
                }
                return absentUsers;
            }

        }
      return null;
    }

    public List<AttendanceResponseDto> getLateUsers(){
        date  =  timeFetcherApi.getCurrentDateInSouthAfrica();
        currentDate = LocalDate.parse(date , formatDate);

        List<AttendanceRecord> records = attendanceRepository.findAttendanceByDateOrderByLogInTimeDesc(currentDate);
        List<AttendanceRecord> lateComers = new ArrayList<AttendanceRecord>();
        for (AttendanceRecord attRecords : records) {
            if (attRecords.getStatus().equals(Status.LATE)){
                lateComers.add(attRecords);
            }
        }
        return attendanceDtoMapper.mapToResponseDtoList(lateComers);
    }
}