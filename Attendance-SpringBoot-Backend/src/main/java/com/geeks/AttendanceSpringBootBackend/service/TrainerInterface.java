package com.geeks.AttendanceSpringBootBackend.service;

import com.geeks.AttendanceSpringBootBackend.entity.Learner;
import java.util.List;

public interface TrainerInterface {
    List<Learner> getAllLearnerAttendance();
}