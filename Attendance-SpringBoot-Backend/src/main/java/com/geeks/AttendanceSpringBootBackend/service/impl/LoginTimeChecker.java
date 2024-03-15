package com.geeks.AttendanceSpringBootBackend.service.impl;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;


@Component
public class LoginTimeChecker {
    @Value("${office.deadline-time}")
    private LocalTime deadlineTime;
    @Value("${office.clock-in-time}")
    private LocalTime clockInTime;


    @Lazy
    public boolean isLate(LocalTime logInTime ){
        if ((logInTime.isAfter(clockInTime))){
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
