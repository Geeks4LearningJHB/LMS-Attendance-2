package com.geeks.AttendanceSpringBootBackend.service.impl;

import com.geeks.AttendanceSpringBootBackend.entity.Learner;
import com.geeks.AttendanceSpringBootBackend.repository.LearnerRepository;
import com.geeks.AttendanceSpringBootBackend.service.AdminInterface;
import com.geeks.AttendanceSpringBootBackend.service.LearnerInterface;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LearnerServiceImplementation implements LearnerInterface {

    private final LearnerRepository learnerRepository;

    @Override
    public Learner getLearnerAttendance(Long id) {

        return learnerRepository.findById(id).orElse(null);
    }

    @Override
    public Learner addNewLearner(Learner learner) {
        return learnerRepository.save(learner);
    }
}
