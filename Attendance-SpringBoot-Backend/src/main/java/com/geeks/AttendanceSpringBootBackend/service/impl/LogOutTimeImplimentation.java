package com.geeks.AttendanceSpringBootBackend.service.impl;

import org.springframework.stereotype.Component;
import java.time.LocalTime;

@Component
public class LogOutTimeImplimentation {
    private final LocalTime normalClockInTime = LocalTime.of(7, 0); // Normal clock in time
    private final LocalTime lateClockInTime = LocalTime.of(8, 0); // Late clock in time
    private final LocalTime normalLogoutTime = LocalTime.of(15, 0); // Normal logout time
    private final LocalTime maxCheckOutTime = LocalTime.of(17, 0); // Maximum logout time

    public LocalTime checkOutTimeCreation(LocalTime clockInTime) {

        // Get the current system time
        LocalTime currentTime = LocalTime.now();

        LocalTime checkOutTime;

        // Check if the clock in time is between >=7:00 and <=8:00
        if (clockInTime.equals(normalClockInTime) || (clockInTime.isAfter(normalClockInTime)
                && clockInTime.isBefore(lateClockInTime))) {
            // If clock in time is between 7:00 and 8:00 (inclusive), use normal logout time(16:00)

            checkOutTime = clockInTime.plusHours(9);

        } else if (clockInTime.isAfter(lateClockInTime)) {
            // If clock in time is after 8:00, use max logout time
            checkOutTime = maxCheckOutTime;
        } else {
            // For any other clock in time, default to normal logout time
            checkOutTime = normalLogoutTime.plusHours(currentTime.getHour() - clockInTime.getHour())
                    .plusMinutes(currentTime.getMinute() - clockInTime.getMinute());
        }

        return checkOutTime;
    }
}
