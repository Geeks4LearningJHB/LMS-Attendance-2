package com.geeks.AttendanceSpringBootBackend.controller;


import com.geeks.AttendanceSpringBootBackend.entity.User;
import com.geeks.AttendanceSpringBootBackend.service.UserInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    UserInterface userInterface;

    @PostMapping
    public User addNewUser(@RequestBody User user){
         System.out.println(user);
        return userInterface.addNewUser(user);
    }

    @GetMapping("/all-users")
    public List<User> allUsers(){
        return userInterface.viewUsers();
    }

    @GetMapping("/user")
    public Optional<User> userByEmail(@RequestParam String email){
        System.out.println(email);
        Optional<User> user = userInterface.findUserByEmail(email);
       String name =  user.get().getUsername();
        System.out.println(name);
        return user;
    }

}
