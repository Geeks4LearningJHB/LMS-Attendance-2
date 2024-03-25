package com.geeks.AttendanceSpringBootBackend.entity.dto;


import com.geeks.AttendanceSpringBootBackend.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class LogInResponseDto {

    private User user;
    private AttendanceResponseDto attendanceResponseDto;


}
