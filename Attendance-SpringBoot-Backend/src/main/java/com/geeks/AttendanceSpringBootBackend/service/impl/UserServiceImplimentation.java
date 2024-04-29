package com.geeks.AttendanceSpringBootBackend.service.impl;

import com.geeks.AttendanceSpringBootBackend.entity.dto.Geek;
import com.geeks.AttendanceSpringBootBackend.feign.UserFeignInterface;
import com.geeks.AttendanceSpringBootBackend.service.UserInterface;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@Slf4j
public class UserServiceImplimentation implements UserInterface {

    @Autowired
    private UserFeignInterface userFeignInterface;

//    public UserResponseDTO mapToDto(User user) {
//        UserResponseDTO userResponse = new UserResponseDTO();
//        userResponse.setUserId(user.getUserId());
//        userResponse.setUserName(user.getUserName());
//        userResponse.setUserSurname(user.getUserSurname());
//        userResponse.setEmail(user.getEmail());
//        userResponse.setSponsor(user.getSponsor());
//        return userResponse;
//    }



    @Override
    public ResponseEntity<?> allGeeks(){

        Object body = userFeignInterface.getAllGeeks().getBody();

        // Check if the body is not null and is an instance of List<User>
        if (body != null && body instanceof List<?>) {
            try {
                // Cast the body to List<User>
                List<Geek> geekList = (List<Geek>) body;
                log.info("geeks: {}", geekList);
            } catch (ClassCastException e) {
                // Handle if the cast fails
                e.printStackTrace();
            }
        } else {
            // Handle if the body is null or not an instance of List<User>
            return null; // or throw an exception
        }

        return userFeignInterface.getAllGeeks();
    }

}
