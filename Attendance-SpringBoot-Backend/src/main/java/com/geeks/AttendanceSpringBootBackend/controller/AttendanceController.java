package com.geeks.AttendanceSpringBootBackend.controller;

import com.geeks.AttendanceSpringBootBackend.entity.User;
import com.geeks.AttendanceSpringBootBackend.entity.dto.AttendanceResponseDto;
import com.geeks.AttendanceSpringBootBackend.entity.dto.UserResponseDTO;
import com.geeks.AttendanceSpringBootBackend.exceptions.UserException;
import com.geeks.AttendanceSpringBootBackend.repository.AttendanceRepository;
import com.geeks.AttendanceSpringBootBackend.service.AttendanceInterface;
import com.geeks.AttendanceSpringBootBackend.service.IpAdressInterface;
import com.geeks.AttendanceSpringBootBackend.service.impl.CheckOutTimeImplimentation;
import com.geeks.AttendanceSpringBootBackend.service.impl.TimeFetcherApi;
import com.sun.tools.javac.Main;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@RequestMapping("/attendance")
public class AttendanceController {
    private static final Logger logger = LogManager.getLogger(Main.class);
    @Autowired
    private AttendanceInterface attendanceInterface;
    @Autowired
    private IpAdressInterface ipAdressInterface;
    @Autowired
    private AttendanceRepository attendanceRepository;
    @Autowired
    TimeFetcherApi timeFetcherApi;
    @Autowired
    CheckOutTimeImplimentation checkOutTimeImplimentation;

    @PostMapping("/create")
    public ResponseEntity<AttendanceResponseDto> addNewAttendance(@RequestBody User user){

        AttendanceResponseDto attendanceResponseDto =attendanceInterface.newAttendance(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(attendanceResponseDto);
    }
    @GetMapping("/view-all")
    public List<AttendanceResponseDto> attendanceRecord(){

        return attendanceInterface.attendanceList();
    }
    //DO NOT TOUCH !!!
    @GetMapping("/scan-by-attendance-id/{attendanceId}")
    public String updateLogOutTime(@PathVariable long attendanceId){
        AttendanceResponseDto attendanceRecord = attendanceInterface.getAttendanceRecordById(attendanceId);
        if (attendanceRecord == null) {
            return "Attendance doesn't exist";
        }
        String southAfricanTime = timeFetcherApi.getCurrentTimeInSouthAfrica();
        //Set scanned to true and update the record in our database
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm");
        LocalTime formattedTime = LocalTime.parse(southAfricanTime , formatter);
        attendanceInterface.scannedQr(attendanceRecord.getId());

        attendanceInterface.updateLogOutTime(attendanceRecord.getId() , formattedTime);
        return "You just scanned your QR Thank You ";

    }

    @GetMapping("/view-by-attendance-id/{attendanceId}")
    public ResponseEntity<AttendanceResponseDto> attendanceById(@PathVariable long attendanceId){
        AttendanceResponseDto attendanceRecord = attendanceInterface.getAttendanceRecordById(attendanceId);
        if (attendanceRecord == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(attendanceRecord);
    }
    @GetMapping("/view-by-user-id/{userId}")
    public List<AttendanceResponseDto> attendanceByUserId(@PathVariable long userId){
        return attendanceInterface.getAllUserAttendances(userId);
    }

    @GetMapping("/today-attendance")
    public List<AttendanceResponseDto> todayAttendance(){
        return attendanceInterface.getTodayAttendance();
    }

   @DeleteMapping("delete/{id}")
   public String todayAttendance(@PathVariable long id){

        attendanceInterface.deleteAttendanceRecord(id);
        return "DELETED!!!!!";
   }

    @PutMapping("/update/status/{id}/{status}")
    public void UpdateAttendance(@PathVariable long id,@PathVariable String status){
        attendanceInterface.updateAttendanceRecord(id, status );
    }

    @GetMapping("/update/logOut/{id}/{logOutTime}")
    public void UpdateLogOutTime(@PathVariable long id,@PathVariable LocalTime logOutTime){
      attendanceInterface.updateLogOutTime(id, logOutTime );
    }
    @GetMapping("/scanLink/{id}")
    public void scanLink(@PathVariable long id){
       attendanceInterface.scannedQr(id);
    }
    @GetMapping("log-out-flag/{id}")
    public boolean logOutFlag(@PathVariable long id){
       return checkOutTimeImplimentation.logOutBeforeExpected(id);
    }

    @GetMapping("/early-logouts")
    public List<AttendanceResponseDto> getAllEarlyLogOutTimes() {
        return attendanceInterface.getAllEarlyLogOutTimes();
    }

    @GetMapping("/absent/{time}/{date}")
    public ResponseEntity<List<UserResponseDTO>> getAbsentGeeks(@PathVariable LocalTime time ,  LocalDate date) {

     List<UserResponseDTO> absent =  attendanceInterface.absentGeeks(time , date);

        if (absent == null && time.isBefore(LocalTime.of(7, 30))) {
            throw new IllegalStateException("Please Check after 07h30");
        }
        if (absent == null){
            throw new UserException
            ("Please Check after 07h30");
        }
        logger.info(absent.size());
        return ResponseEntity.ok(absent);
    }

}

