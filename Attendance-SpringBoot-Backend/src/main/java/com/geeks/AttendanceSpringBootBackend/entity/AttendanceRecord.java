package com.geeks.AttendanceSpringBootBackend.entity;

import com.geeks.AttendanceSpringBootBackend.enums.Status;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Time;
import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class AttendanceRecord {
    @Id
    private Long Id;
    private Time logInTime;
    private Time logOutTime;
    private Date date;
    private String logInLocation;
    private Status status;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserDummy userId;
}
