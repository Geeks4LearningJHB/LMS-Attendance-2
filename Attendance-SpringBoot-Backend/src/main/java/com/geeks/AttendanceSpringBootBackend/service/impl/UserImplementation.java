package com.geeks.AttendanceSpringBootBackend.service.impl;

import com.geeks.AttendanceSpringBootBackend.entity.User;
import com.geeks.AttendanceSpringBootBackend.repository.UserRepository;
import com.geeks.AttendanceSpringBootBackend.service.UserInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserImplementation implements UserInterface {

    @Autowired
    UserRepository userRepository;

    @Override
    public User addNewUser(User userDummy) {
        return userRepository.save(userDummy);
    }

    @Override
    public List<User> viewUsers() {
        return userRepository.findAll();
    }
}
