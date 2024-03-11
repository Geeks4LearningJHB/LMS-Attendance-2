package com.geeks.AttendanceSpringBootBackend.controller;


import com.geeks.AttendanceSpringBootBackend.entity.User;
import com.geeks.AttendanceSpringBootBackend.service.impl.LogInTestImplementation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
public class LogInTestController {

    @Autowired
    LogInTestImplementation logInTestImplementation;

    @GetMapping("/login")
    public Optional<User> testLogin(String email , String password){
        return logInTestImplementation.logInTester(email ,password);
    }


}
