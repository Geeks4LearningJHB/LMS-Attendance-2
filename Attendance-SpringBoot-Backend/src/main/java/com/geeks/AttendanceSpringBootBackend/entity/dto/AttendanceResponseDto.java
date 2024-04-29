package com.geeks.AttendanceSpringBootBackend.entity.dto;

import com.geeks.AttendanceSpringBootBackend.enums.Status;

import com.geeks.AttendanceSpringBootBackend.enums.UserRole;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;


@AllArgsConstructor
@Data
@NoArgsConstructor
public class AttendanceResponseDto {
    private long id;
    private LocalTime logInTime;
    private LocalTime checkOutTime;
    private LocalDate date;
    private String logInLocation;
    private String userId;
    private Status status;
//    private String name;
//    private String surname;
//    private String sponsor;
//    private UserRole role;
    private LocalTime logOutTime;
    private boolean scanned;


}
