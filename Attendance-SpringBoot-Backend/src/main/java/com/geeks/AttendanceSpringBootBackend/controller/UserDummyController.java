package com.geeks.AttendanceSpringBootBackend.controller;


import com.geeks.AttendanceSpringBootBackend.entity.UserDummy;
import com.geeks.AttendanceSpringBootBackend.service.impl.UserDummyImplimentation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserDummyController {

    @Autowired
    UserDummyImplimentation userDummyImplimentation;

    @PostMapping
    public UserDummy addNewUser(@RequestBody UserDummy userDummy){
         System.out.println(userDummy);
        return userDummyImplimentation.addNewUser(userDummy);
    }

    @GetMapping
    public List<UserDummy> allUsers(){
        return userDummyImplimentation.viewUsers();
    }

}
