package com.geeks.AttendanceSpringBootBackend.entity.dto;

import com.geeks.AttendanceSpringBootBackend.enums.UserRole;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Geek {
    private String userId;
    private String lastname;
    private String email;
    private String firstname;
    @Enumerated(EnumType.STRING)
    private UserRole role;
    private String idNumber;

    private LocalDate learnershipStartDate;
    private LocalDate learnershipEndDate;
    private String password;
    private String sponsorId;
    private String batchId;
}