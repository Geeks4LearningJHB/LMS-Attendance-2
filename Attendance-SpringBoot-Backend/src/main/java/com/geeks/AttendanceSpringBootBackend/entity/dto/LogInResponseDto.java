package com.geeks.AttendanceSpringBootBackend.entity.dto;


import com.geeks.AttendanceSpringBootBackend.entity.User;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
public class LogInResponseDto {

    private User user;
    private AttendanceResponseDto attendanceResponseDto;


}
