package com.geeks.AttendanceSpringBootBackend.service.impl;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;


@Component
public class LoginTimeChecker {
    LocalTime deadlineTime = LocalTime.of(9, 00); //If the user doesnt' log in before 09h00 then will return as absent
    LocalTime clockInTime = LocalTime.of(7 , 30);


@Lazy
    public boolean isLate(LocalTime logInTime ){
        if ((logInTime.isAfter(clockInTime))&&(logInTime.isBefore(deadlineTime))){
            return true;
        }
        return false;
    }

    public boolean isPresent(LocalTime logInTime ){
        if ((logInTime.isBefore(clockInTime)) || (logInTime.equals(clockInTime))){
            return true;

        }
        return false;
    }

}
