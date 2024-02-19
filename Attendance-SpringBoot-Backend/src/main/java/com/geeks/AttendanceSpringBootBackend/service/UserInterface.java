package com.geeks.AttendanceSpringBootBackend.service;

import com.geeks.AttendanceSpringBootBackend.entity.User;

import java.util.List;

public interface UserInterface {
    User  addNewUser(User user);
    List<User> viewUsers();



}
