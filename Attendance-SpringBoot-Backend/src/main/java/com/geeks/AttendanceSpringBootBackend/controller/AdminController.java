package com.geeks.AttendanceSpringBootBackend.controller;

import com.geeks.AttendanceSpringBootBackend.entity.AttendanceRecord;
import com.geeks.AttendanceSpringBootBackend.entity.User;
import com.geeks.AttendanceSpringBootBackend.entity.dto.AttendanceRequestDto;
import com.geeks.AttendanceSpringBootBackend.entity.dto.AttendanceResponseDto;
import com.geeks.AttendanceSpringBootBackend.exceptions.AttendanceExceptions;
import com.geeks.AttendanceSpringBootBackend.repository.AttendanceRepository;
import com.geeks.AttendanceSpringBootBackend.service.AdminInterface;
import com.geeks.AttendanceSpringBootBackend.service.AttendanceInterface;
import com.geeks.AttendanceSpringBootBackend.service.IpAdressInterface;
import com.geeks.AttendanceSpringBootBackend.service.impl.AttendanceServiceImplementation;
import com.geeks.AttendanceSpringBootBackend.service.impl.LogOutTimeImplimentation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminInterface adminInterface;
    @Autowired
    AttendanceRepository attendanceRepository;
    @Autowired
    AttendanceInterface attendanceInterface;

    private final AttendanceServiceImplementation attendanceService;
    @Autowired
    public AdminController(AttendanceServiceImplementation attendanceService){

        this.attendanceService=attendanceService;
    }

    @PostMapping("/create")
    public ResponseEntity<AttendanceResponseDto> addNewAttendance(@RequestBody User user){

//        AttendanceResponseDto attendanceResponseDto = new AttendanceResponseDto();
        AttendanceResponseDto attendanceResponseDto =attendanceInterface.newAttendance(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(attendanceResponseDto);
    }

    @PutMapping("/attendance/{id}")
    public ResponseEntity<AttendanceResponseDto> updateAttendanceRecord(@PathVariable long id, @RequestBody AttendanceRequestDto attendanceRecordDetails) {
        AttendanceResponseDto updatedRecord =attendanceService.updateAttendanceRecord(id,attendanceRecordDetails.getStatus().toString());
        if (updatedRecord != null) {
            return ResponseEntity.ok(updatedRecord);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/attendance/{id}")
    public ResponseEntity<AttendanceResponseDto> getAttendanceRecordById(@PathVariable("id") long id) {
        AttendanceResponseDto attendanceRecord = adminInterface.getAttendanceRecordById(id);
        if (attendanceRecord != null) {
            return ResponseEntity.ok(attendanceRecord);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/attendance/{id}")
    public ResponseEntity<Void> deleteAttendanceRecord(@PathVariable("id") long id) {
        adminInterface.deleteAttendanceRecord(id);
        return ResponseEntity.noContent().build();
    }


}
