package com.geeks.AttendanceSpringBootBackend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Leave")
public class LeaveDummy {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long leaveId;
    private String leaveType;
    private Boolean isOnLeave;

}
