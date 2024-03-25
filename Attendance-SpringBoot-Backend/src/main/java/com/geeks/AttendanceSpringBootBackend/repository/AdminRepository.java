package com.geeks.AttendanceSpringBootBackend.repository;

import com.geeks.AttendanceSpringBootBackend.entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Long> {
    Admin findByAdminUsername(String adminUsername);
}
