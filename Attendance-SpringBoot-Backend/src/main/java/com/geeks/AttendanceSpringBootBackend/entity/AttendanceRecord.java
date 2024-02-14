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

    //Join Attendance and UserDummy tables
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User userId;

    //Join Attendance  and Leave tables
    @ManyToOne
    @JoinColumn(name = "leave_id")
    private Leave leaveId;
}
