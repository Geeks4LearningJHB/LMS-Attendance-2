package com.geeks.AttendanceSpringBootBackend.controller;

import com.geeks.AttendanceSpringBootBackend.entity.Learner;
import com.geeks.AttendanceSpringBootBackend.service.impl.TrainerServiceImplementation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Service
@RestController
@RequestMapping("/trainers")
public class TrainerController {
    @Autowired
    private TrainerServiceImplementation trainerService;

    @GetMapping("/learners/attendance")
    public ResponseEntity<List<Learner>> getAllLearnerAttendance() {
        List<Learner> learners = trainerService.getAllLearnerAttendance();
        return new ResponseEntity<>(learners, HttpStatus.OK);
    }
}
