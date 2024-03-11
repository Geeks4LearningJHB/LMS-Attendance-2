package com.geeks.AttendanceSpringBootBackend.repository;

import com.geeks.AttendanceSpringBootBackend.entity.AttendanceRecord;
import com.geeks.AttendanceSpringBootBackend.entity.dto.AttendanceResponseDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Repository
public interface AttendanceRepository extends JpaRepository<AttendanceRecord, Long> {
   List <AttendanceResponseDto> findAttendanceByDate(LocalDate date);
  // AttendanceRecord findByUserIdAndDate(long userId , LocalDate currentDate);

   AttendanceRecord findByDate(LocalDate date);
   AttendanceRecord findByUserIdUserIdAndDate(long id , LocalDate date);


}
