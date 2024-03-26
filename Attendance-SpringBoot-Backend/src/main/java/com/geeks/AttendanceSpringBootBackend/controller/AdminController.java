package com.geeks.AttendanceSpringBootBackend.controller;

import com.geeks.AttendanceSpringBootBackend.entity.Learner;
import com.geeks.AttendanceSpringBootBackend.entity.User;
import com.geeks.AttendanceSpringBootBackend.entity.dto.AttendanceRequestDto;
import com.geeks.AttendanceSpringBootBackend.entity.dto.AttendanceResponseDto;
import com.geeks.AttendanceSpringBootBackend.service.LearnerInterface;
import com.geeks.AttendanceSpringBootBackend.service.impl.AttendanceServiceImplementation;
import com.geeks.AttendanceSpringBootBackend.service.impl.LearnerServiceImplementation;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AttendanceServiceImplementation attendanceService;
    private final LearnerServiceImplementation  learnerService;



    @GetMapping("/attendance")
    public ResponseEntity<List<AttendanceResponseDto>> getAllAttendanceRecords() {
        List<AttendanceResponseDto> attendanceRecords = attendanceService.attendanceList();
        return ResponseEntity.ok(attendanceRecords);
    }



    @GetMapping("/attendance/{id}")
    public ResponseEntity<AttendanceResponseDto> getAttendanceRecordById(@PathVariable Long id) {
        AttendanceResponseDto attendanceRecord = attendanceService.getAttendanceRecordById(id);
        if (attendanceRecord != null) {
            return ResponseEntity.ok(attendanceRecord);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @PutMapping("/attendance/{id}")
    public ResponseEntity<AttendanceResponseDto> updateAttendanceRecord(@PathVariable Long id, @RequestBody AttendanceRequestDto attendanceRecordDetails) {
        AttendanceResponseDto updatedAttendanceRecord = attendanceService.updateAttendanceRecord(id, attendanceRecordDetails.getStatus().toString());
        if (updatedAttendanceRecord != null) {
            return ResponseEntity.ok(updatedAttendanceRecord);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/attendance/{id}")
    public ResponseEntity<Void> deleteAttendanceRecord(@PathVariable Long id) {
        attendanceService.deleteAttendanceRecord(id);
        return ResponseEntity.noContent().build();
    }
//Added this method for admin to create learner With sponsor
    @PostMapping("/addLearner")
    public Learner addLearner (@RequestBody Learner learner){
        return learnerService.addNewLearner(learner);
    }
}
