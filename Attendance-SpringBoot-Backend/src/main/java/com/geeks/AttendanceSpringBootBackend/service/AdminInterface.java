package com.geeks.AttendanceSpringBootBackend.service;

import com.geeks.AttendanceSpringBootBackend.entity.User;

import java.util.List;

public interface AdminInterface {
    User updateUser(Long id, User userDetails);

    void deleteUser(Long id);


    List<User> getAllUsers();
}