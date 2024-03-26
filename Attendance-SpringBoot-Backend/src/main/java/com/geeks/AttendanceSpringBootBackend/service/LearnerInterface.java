package com.geeks.AttendanceSpringBootBackend.service;
import com.geeks.AttendanceSpringBootBackend.entity.Learner;
import com.geeks.AttendanceSpringBootBackend.entity.User;

public interface LearnerInterface {
    Learner getLearnerAttendance(Long id);
    Learner addNewLearner(Learner learner);
}
