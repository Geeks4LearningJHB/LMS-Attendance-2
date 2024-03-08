package com.geeks.AttendanceSpringBootBackend.service.impl;

import com.geeks.AttendanceSpringBootBackend.entity.User;
import com.geeks.AttendanceSpringBootBackend.repository.UserRepository;
import com.geeks.AttendanceSpringBootBackend.service.AttendanceInterface;
import com.geeks.AttendanceSpringBootBackend.service.UserInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Component
public class LogInTestImplementation {

    @Autowired
    UserRepository userRepository;
    @Autowired
    AttendanceInterface attendanceInterface;
    public Optional<User> logInTester(String email , String password){

        Optional<User> validUser = userRepository.findByEmail(email);

        if (validUser.isPresent()){
            String userPassword = validUser.get().getPassword();
            String  userEmail = validUser.get().getEmail();

            if (userEmail.equals(email) && userPassword.equals(password)){
                User user = validUser.get();
                attendanceInterface.newAttendance(user);
            }
            else {
                throw new IllegalStateException("Failed to log in try again");
            }
            return validUser;
        }
        else {
            throw new IllegalStateException("User not found");

        }

    }


}
