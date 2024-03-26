package com.geeks.AttendanceSpringBootBackend.service.impl;

import com.geeks.AttendanceSpringBootBackend.entity.Learner;
import com.geeks.AttendanceSpringBootBackend.repository.LearnerRepository;
import com.geeks.AttendanceSpringBootBackend.service.TrainerInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TrainerServiceImplementation implements TrainerInterface {
    @Autowired
    private LearnerRepository learnerRepository;

    @Override
    public List<Learner> getAllLearnerAttendance() {
        return learnerRepository.findAll();
    }

}
