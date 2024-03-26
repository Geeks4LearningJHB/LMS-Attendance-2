package com.geeks.AttendanceSpringBootBackend.entity;


import com.geeks.AttendanceSpringBootBackend.enums.UserRole;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.*;
import lombok.*;

@Data
@Entity
@Table(name = "Trainer")
public class Trainer extends User {

}
