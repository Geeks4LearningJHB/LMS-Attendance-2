package com.geeks.AttendanceSpringBootBackend.entity.dto;

import com.geeks.AttendanceSpringBootBackend.enums.Status;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Time;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AttendanceRequestDto {


    private Time logInTime;
    private Time logOutTime;
    private Date date;
    private String logInLocation;
    private Status status;
    private long userId;




}
