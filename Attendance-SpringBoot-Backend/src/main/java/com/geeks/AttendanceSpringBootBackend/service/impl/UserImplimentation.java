package com.geeks.AttendanceSpringBootBackend.service.impl;

import com.geeks.AttendanceSpringBootBackend.entity.User;
import com.geeks.AttendanceSpringBootBackend.repository.UserRepository;
import com.geeks.AttendanceSpringBootBackend.service.UserInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class UserImplimentation implements UserInterface {

    @Autowired
    UserRepository userRepository;

    @Override
    public User addNewUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public List<User> viewUsers() {
        return userRepository.findAll();
    }


}
