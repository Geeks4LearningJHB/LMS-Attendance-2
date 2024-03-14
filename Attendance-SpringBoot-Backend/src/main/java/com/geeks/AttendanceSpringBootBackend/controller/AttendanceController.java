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

    @Autowired
    private AttendanceInterface attendanceInterface;
    @Autowired
    private IpAdressInterface ipAdressInterface;
    @Autowired
    AttendanceRepository attendanceRepository;

    @PostMapping("/create")
    public ResponseEntity<AttendanceResponseDto> addNewAttendance(@RequestBody User user){

        AttendanceResponseDto attendanceResponseDto =attendanceInterface.newAttendance(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(attendanceResponseDto);
    }
    @GetMapping("/view-all")
    public List<AttendanceResponseDto> attendanceRecord(){

        return attendanceInterface.attendanceList();
    }

    @GetMapping("/view-by-attendance-id/{id}")
    public AttendanceResponseDto attendanceById(@PathVariable long userId){
        return attendanceInterface.getAttendanceRecordById(userId);
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

    @PutMapping("/update/{id}/{status}")
    public void UpdateAttendance(@PathVariable long id,@PathVariable String status){
        attendanceInterface.updateAttendanceRecord(id, status );
    }



}

