package com.geeks.AttendanceSpringBootBackend.service.impl;

import org.springframework.stereotype.Component;

import java.time.LocalTime;


@Component
public class LoginTimeChecker {
    LocalTime deadlineTime = LocalTime.of(9, 0); //If the user doesnt' log in before 09h00 then will return as absent
    LocalTime clockInTime = LocalTime.of(7 , 30);

    public boolean isLate(LocalTime logInTime ){
        if ((logInTime.isAfter(clockInTime))&&(logInTime.isBefore(deadlineTime))){
            return true;

        }
        return false;
    }





}
