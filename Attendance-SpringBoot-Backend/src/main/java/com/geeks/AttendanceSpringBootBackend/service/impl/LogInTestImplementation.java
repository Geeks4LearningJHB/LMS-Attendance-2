package com.geeks.AttendanceSpringBootBackend.service.impl;

import com.geeks.AttendanceSpringBootBackend.entity.User;
import com.geeks.AttendanceSpringBootBackend.entity.dto.LogInRequestDTO;
import com.geeks.AttendanceSpringBootBackend.repository.UserRepository;
import com.geeks.AttendanceSpringBootBackend.service.AttendanceInterface;
import com.sun.tools.javac.Main;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class LogInTestImplementation {
    private static final Logger logger = LogManager.getLogger(Main.class);

    @Autowired
    UserRepository userRepository;
    @Autowired
    AttendanceInterface attendanceInterface;
    public Optional<User> logInTester(LogInRequestDTO logInRequest){

        Optional<User> validUser = userRepository.findByEmail(logInRequest.getEmail());
        System.out.println(validUser);
        if (validUser.isPresent()){
            String userPassword = validUser.get().getPassword();
            String  userEmail = validUser.get().getEmail();

            if (userEmail.equals(logInRequest.getEmail()) && userPassword.equals(logInRequest.getPassword())){
                User user = validUser.get();
                logger.info(logInRequest);
                if (!user.getRole().equals("Admin")){
                    attendanceInterface.newAttendance(user);
                }
                return validUser;
            }
            else {
                throw new IllegalStateException("Failed to log in try again");
            }

        }
        else {
            throw new IllegalStateException("User not found");

        }

    }
}
