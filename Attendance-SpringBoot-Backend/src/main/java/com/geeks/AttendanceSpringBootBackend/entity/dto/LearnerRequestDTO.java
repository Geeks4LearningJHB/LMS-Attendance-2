package com.geeks.AttendanceSpringBootBackend.entity.dto;

import com.geeks.AttendanceSpringBootBackend.enums.Sponsor;

public class LearnerRequestDTO {
    private long userId;
    private String userName;
    private String userSurname;
    private String email;
    private Sponsor sponsor;
}
