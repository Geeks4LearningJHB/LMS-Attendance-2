package com.geeks.AttendanceSpringBootBackend.service.impl;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.time.LocalTime;

@Component
public class LogOutTimeImplimentation {

    @Value("${office.normal-clock-in-time}")
    private String normalClockInTimeStr;

    @Value("${office.late-clock-in-time}")
    private String lateClockInTimeStr;

    @Value("${office.normal-logout-time}")
    private String normalLogoutTimeStr;

    @Value("${office.max-check-out-time}")
    private String maxCheckOutTimeStr;

    public LocalTime checkOutTimeCreation(LocalTime clockInTime) {
        LocalTime normalClockInTime = LocalTime.parse(normalClockInTimeStr);
        LocalTime lateClockInTime = LocalTime.parse(lateClockInTimeStr);
        LocalTime normalLogoutTime = LocalTime.parse(normalLogoutTimeStr);
        LocalTime maxCheckOutTime = LocalTime.parse(maxCheckOutTimeStr);

        LocalTime currentTime = LocalTime.now();

        LocalTime checkOutTime;

        if (clockInTime.equals(normalClockInTime) || (clockInTime.isAfter(normalClockInTime)
                && clockInTime.isBefore(lateClockInTime))) {
            checkOutTime = clockInTime.plusHours(9);
        } else if (clockInTime.isAfter(lateClockInTime)) {
            checkOutTime = maxCheckOutTime;
        } else {
            checkOutTime = normalLogoutTime.plusHours(currentTime.getHour() - clockInTime.getHour())
                    .plusMinutes(currentTime.getMinute() - clockInTime.getMinute());
        }

        return checkOutTime;
    }
}
