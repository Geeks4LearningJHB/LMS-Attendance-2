package com.geeks.AttendanceSpringBootBackend.entity;

import com.geeks.AttendanceSpringBootBackend.enums.UserRole;
import com.geeks.AttendanceSpringBootBackend.enums.Sponsor;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "learners")
public class Learner extends User {


    @Enumerated(EnumType.STRING)
    @Column(name = "sponsor")
    private Sponsor sponsor;

}
