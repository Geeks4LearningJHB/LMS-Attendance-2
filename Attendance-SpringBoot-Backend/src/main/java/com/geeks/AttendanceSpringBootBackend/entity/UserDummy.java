package com.geeks.AttendanceSpringBootBackend.entity;

import jakarta.persistence.*;
import lombok.*;


@Entity
@AllArgsConstructor
@Data
@NoArgsConstructor
@Getter
@Setter
public class UserDummy {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long userId;
    private String username;
    private String email;


}
