package com.geeks.AttendanceSpringBootBackend.repository;

import com.geeks.AttendanceSpringBootBackend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface UserRepository extends JpaRepository<User, Long> {

}
