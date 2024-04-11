package com.geeks.AttendanceSpringBootBackend.service;

import com.geeks.AttendanceSpringBootBackend.entity.User;
import com.geeks.AttendanceSpringBootBackend.entity.dto.UserResponseDTO;
import org.springframework.stereotype.Service;

import java.util.List;


public interface UserInterface {
    User  addNewUser(User user);
    List<UserResponseDTO> viewUsers();
    List<UserResponseDTO> allGeeks();





}
