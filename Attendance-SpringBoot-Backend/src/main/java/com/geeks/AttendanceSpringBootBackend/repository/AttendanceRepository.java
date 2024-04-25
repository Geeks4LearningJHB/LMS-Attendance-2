package com.geeks.AttendanceSpringBootBackend.repository;

import com.geeks.AttendanceSpringBootBackend.entity.AttendanceRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface AttendanceRepository extends JpaRepository<AttendanceRecord, Long> {
   List <AttendanceRecord> findAttendanceByDateOrderByLogInTimeDesc(LocalDate date);
  // AttendanceRecord findByUserIdAndDate(long userId , LocalDate currentDate);

   AttendanceRecord findByUserIdUserIdAndDate(long id , LocalDate date);
   List<AttendanceRecord> findByUserIdUserId(long userId);


    List<AttendanceRecord> findAllByUserIdUserIdOrderByDateDesc(long userId);
}
