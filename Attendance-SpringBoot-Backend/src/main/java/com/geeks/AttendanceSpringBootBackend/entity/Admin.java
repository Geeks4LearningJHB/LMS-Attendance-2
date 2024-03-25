package com.geeks.AttendanceSpringBootBackend.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "admins")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class Admin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private long adminId;

    @Column(name = "user_name")
    private String adminUsername;

    @Column(name = "email")
    private String adminEmail;

    @Column(name = "password")
    private String password;
}