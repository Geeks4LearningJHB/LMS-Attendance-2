package com.geeks.AttendanceSpringBootBackend.entity.dto;

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
public class AttendanceRequestDto {

    private long id;
    private LocalTime logInTime;
    private LocalTime checkOutTime;
    private LocalDate date;
    private String logInLocation;
    private Status status;
    private long userId;

}
