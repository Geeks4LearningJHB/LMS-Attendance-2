package com.geeks.AttendanceSpringBootBackend.controller;

import com.geeks.AttendanceSpringBootBackend.entity.AttendanceRecord;
import com.geeks.AttendanceSpringBootBackend.entity.User;
import com.geeks.AttendanceSpringBootBackend.entity.dto.AttendanceRequestDto;
import com.geeks.AttendanceSpringBootBackend.entity.dto.AttendanceResponseDto;
import com.geeks.AttendanceSpringBootBackend.exceptions.AttendanceExceptions;
import com.geeks.AttendanceSpringBootBackend.repository.AttendanceRepository;
import com.geeks.AttendanceSpringBootBackend.service.AttendanceInterface;
import com.geeks.AttendanceSpringBootBackend.service.IpAdressInterface;
import com.geeks.AttendanceSpringBootBackend.service.impl.LogOutTimeImplimentation;
import com.sun.tools.javac.Main;
import org.apache.coyote.Response;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@RestController
@RequestMapping("/attendance")
@CrossOrigin(origins = "http://localhost:4200/")
public class AttendanceController {
    private static final Logger logger = LogManager.getLogger(Main.class);
    @Autowired
    private AttendanceInterface attendanceInterface;
    @Autowired
    private IpAdressInterface ipAdressInterface;
    @Autowired
    private AttendanceRepository attendanceRepository;

    @PostMapping("/create")
    public ResponseEntity<AttendanceResponseDto> addNewAttendance(@RequestBody User user){

        AttendanceResponseDto attendanceResponseDto =attendanceInterface.newAttendance(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(attendanceResponseDto);
    }
    @GetMapping("/view-all")
    public List<AttendanceResponseDto> attendanceRecord(){

        return attendanceInterface.attendanceList();
    }

    //am using this method for a very different logic do not change
    @GetMapping("/view-by-attendance-id/{attendanceId}")
    public ResponseEntity<AttendanceResponseDto> attendanceById(@PathVariable long attendanceId){
        AttendanceResponseDto attendanceRecord = attendanceInterface.getAttendanceRecordById(attendanceId);
        if (attendanceRecord == null) {
            return ResponseEntity.notFound().build();
        }
        // Set scanned to true and update the record in the database
        attendanceInterface.scannedQr(attendanceRecord.getId());
        attendanceInterface.updateLogOutTime(attendanceRecord.getId() , LocalTime.now());
        return ResponseEntity.ok(attendanceRecord);

    }
    @GetMapping("/view-by-user-id/{userId}")
    public List<AttendanceResponseDto> attendanceByUserId(@PathVariable long userId){
        return attendanceInterface.getAllUserAttendances(userId);
    }

    @GetMapping("/today-attendance/{date}")
    public List<AttendanceResponseDto> todayAttendance(@PathVariable LocalDate date){
        return attendanceInterface.getTodayAttendance(date);
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

      logger.info("Method triggered with ID : " + id +" and time : "+logOutTime);

      attendanceInterface.updateLogOutTime(id, logOutTime );
    }

    @GetMapping("/scanLink/{id}")
    public void scanLink(@PathVariable long id){
       attendanceInterface.scannedQr(id);
    }


}

