package com.geeks.AttendanceSpringBootBackend.repository;

import com.geeks.AttendanceSpringBootBackend.entity.LeaveDummy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LeaveDummyRepository extends JpaRepository<LeaveDummy, Long> {
}
