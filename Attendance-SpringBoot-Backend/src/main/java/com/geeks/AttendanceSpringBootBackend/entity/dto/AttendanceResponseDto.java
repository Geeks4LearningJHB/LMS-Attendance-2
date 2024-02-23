package com.geeks.AttendanceSpringBootBackend.entity.dto;

import com.geeks.AttendanceSpringBootBackend.entity.Leave;
import com.geeks.AttendanceSpringBootBackend.entity.User;
import com.geeks.AttendanceSpringBootBackend.enums.Status;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Time;
import java.time.LocalDate;
import java.time.LocalTime;


@AllArgsConstructor
@Data
@NoArgsConstructor
public class AttendanceResponseDto {

    private long id;
    private LocalTime logInTime;
    private LocalTime logOutTime;
    private LocalDate date;
    private String logInLocation;
    private Status status;
    private Leave leaveId;
    private User userId;


}
