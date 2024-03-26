package com.geeks.AttendanceSpringBootBackend.repository;
import com.geeks.AttendanceSpringBootBackend.entity.Trainer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TrainerRepository extends JpaRepository<Trainer, Long> {
}
