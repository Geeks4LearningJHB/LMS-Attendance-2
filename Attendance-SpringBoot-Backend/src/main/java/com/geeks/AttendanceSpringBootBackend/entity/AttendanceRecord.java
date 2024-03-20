package com.geeks.AttendanceSpringBootBackend.entity;

import com.geeks.AttendanceSpringBootBackend.enums.Status;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class AttendanceRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private LocalTime logInTime;
    private LocalTime checkOutTime;
    private LocalDate date;
    private String logInLocation;
    private Status status;
    private LocalTime logOutTime;
    @Column(nullable = false)
    private boolean scanned = false;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User userId;
}
