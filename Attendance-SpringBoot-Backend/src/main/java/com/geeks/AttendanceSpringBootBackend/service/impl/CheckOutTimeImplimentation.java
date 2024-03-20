package com.geeks.AttendanceSpringBootBackend.service.impl;

import com.geeks.AttendanceSpringBootBackend.entity.AttendanceRecord;
import com.geeks.AttendanceSpringBootBackend.entity.dto.AttendanceResponseDto;
import com.geeks.AttendanceSpringBootBackend.exceptions.AttendanceExceptions;
import com.geeks.AttendanceSpringBootBackend.repository.AttendanceRepository;
import com.geeks.AttendanceSpringBootBackend.service.AttendanceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.time.LocalTime;
import java.util.Optional;

@Component
public class CheckOutTimeImplimentation {
@Autowired
    AttendanceRepository attendanceRepository;
    @Value("${office.normal-clock-in-time}")
    private String normalClockInTimeStr;

    @Value("${office.late-clock-in-time}")
    private String lateClockInTimeStr;

    @Value("${office.normal-logout-time}")
    private String normalLogoutTimeStr;

    @Value("${office.max-check-out-time}")
    private String maxCheckOutTimeStr;
    @Autowired
    private TimeFetcherApi timeFetcherApi;

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
            checkOutTime = normalLogoutTime;
        }

        return checkOutTime;
    }

    public boolean logOutBeforeExpected(long id){

        Optional<AttendanceRecord> attendanceRecord = attendanceRepository.findById(id);

        if (attendanceRecord.isPresent()) {
            AttendanceRecord userAtendanceRecord= attendanceRecord.get();
            if (userAtendanceRecord.getLogOutTime().isAfter(userAtendanceRecord.getCheckOutTime())
                    || userAtendanceRecord.getCheckOutTime().equals(userAtendanceRecord.getLogOutTime())) {
                //true         ||  false

                return true;
            }
            return false;
        }
       throw new AttendanceExceptions("Attendance not found ");
    }

}
