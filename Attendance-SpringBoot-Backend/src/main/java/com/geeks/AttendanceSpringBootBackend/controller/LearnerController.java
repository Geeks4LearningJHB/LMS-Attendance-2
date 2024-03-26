package com.geeks.AttendanceSpringBootBackend.controller;

import com.geeks.AttendanceSpringBootBackend.entity.Learner;
import com.geeks.AttendanceSpringBootBackend.service.impl.LearnerServiceImplementation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/learners")
public class LearnerController {

    @Autowired
    private LearnerServiceImplementation learnerService;

    @GetMapping("/{id}")
    public ResponseEntity<Learner> getLearnerAttendance(@PathVariable Long id) {
        Learner learner = learnerService.getLearnerAttendance(id);
        if (learner != null) {
            return new ResponseEntity<>(learner, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
