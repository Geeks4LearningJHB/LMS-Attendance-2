package com.geeks.AttendanceSpringBootBackend.service;

import com.geeks.AttendanceSpringBootBackend.entity.User;
import com.geeks.AttendanceSpringBootBackend.entity.dto.AttendanceResponseDto;

public interface AdminInterface {

    User updateUser(long id, User userDetails);
    AttendanceResponseDto getAttendanceRecordById(long id);

    void deleteAttendanceRecord(long id);

    //AttendanceResponseDto newAttendance (User user);

}
