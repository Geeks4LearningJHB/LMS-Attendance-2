package com.geeks.AttendanceSpringBootBackend.controller;


import com.geeks.AttendanceSpringBootBackend.entity.User;
import com.geeks.AttendanceSpringBootBackend.service.impl.UserImplementation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    UserImplementation userImplementation;

    @PostMapping
    public User addNewUser(@RequestBody User userDummy){
         System.out.println(userDummy);
        return userImplementation.addNewUser(userDummy);
    }

    @GetMapping
    public List<User> allUsers(){
        return userImplementation.viewUsers();
    }

}
