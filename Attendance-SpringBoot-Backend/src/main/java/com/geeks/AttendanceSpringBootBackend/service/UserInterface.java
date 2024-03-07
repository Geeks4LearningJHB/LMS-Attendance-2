package com.geeks.AttendanceSpringBootBackend.service;

import com.geeks.AttendanceSpringBootBackend.entity.User;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


public interface UserInterface {
    User  addNewUser(User user);
    List<User> viewUsers();
    Optional<User> findUserByEmail(String email);


}
