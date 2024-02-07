package com.geeks.AttendanceSpringBootBackend.repository;

import com.geeks.AttendanceSpringBootBackend.entity.UserDummy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UserDummyRepository extends JpaRepository<UserDummy , Long> {
}
