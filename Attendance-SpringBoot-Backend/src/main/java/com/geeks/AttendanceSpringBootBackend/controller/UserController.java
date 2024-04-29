package com.geeks.AttendanceSpringBootBackend.controller;


import com.geeks.AttendanceSpringBootBackend.entity.dto.UserResponseDTO;
import com.geeks.AttendanceSpringBootBackend.service.UserInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@CrossOrigin (origins = "http://localhost:4200/")
public class UserController {

    @Autowired
    UserInterface userInterface;


//    @GetMapping
//    public List<UserResponseDTO> allUsers(){
//        return userInterface.viewUsers();
//    }

    @GetMapping("/get/allGeeks")
    public ResponseEntity<?> getAllGeeks() {
        return userInterface.allGeeks();
    }

}
