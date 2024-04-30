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

        return userFeignInterface.getAllGeeks();
    }

}
