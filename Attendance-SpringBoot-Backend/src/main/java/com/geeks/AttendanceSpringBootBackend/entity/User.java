//package com.geeks.AttendanceSpringBootBackend.entity;
//
//
//import com.geeks.AttendanceSpringBootBackend.enums.Sponsor;
//import jakarta.persistence.*;
//import lombok.AllArgsConstructor;
//import lombok.Data;
//import lombok.NoArgsConstructor;
//
//import java.time.LocalDate;
//import java.util.ArrayList;
//import java.util.List;
//
//@Entity
//@Data
//@NoArgsConstructor
//@AllArgsConstructor
//@Table(name = "users")
//public class User {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "user_id")
//    private String userId;
//    @Column(name = "user_name")
//    private String userName;
//    @Column(name = "user_surname")
//    private String userSurname;
//    @Column(name = "email")
//    private String email;
//    private String password;
//    private Sponsor sponsor;
//    private String role;
//    private LocalDate LearnershipStartDate;
//    private LocalDate LearnershipEndDate;
//
////    @OneToMany(mappedBy = "userId", cascade = CascadeType.ALL)
////    private List<AttendanceRecord> attendanceRecords = new ArrayList<>();
//
//
//}
