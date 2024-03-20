package com.geeks.AttendanceSpringBootBackend.entity.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LogInRequestDTO {

    String email;
    String password;
}
