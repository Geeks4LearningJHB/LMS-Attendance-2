package com.geeks.AttendanceSpringBootBackend.repository;

import com.geeks.AttendanceSpringBootBackend.entity.Learner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LearnerRepository extends JpaRepository<Learner, Long> {
}