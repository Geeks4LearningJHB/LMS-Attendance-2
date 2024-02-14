package com.geeks.AttendanceSpringBootBackend.entity;

import jakarta.persistence.*;
import lombok.*;


@Entity
@AllArgsConstructor
@Data
@NoArgsConstructor
@Getter
@Setter
@Table(name = "Users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;
    private String username;
    private String email;


}
