package com.geeks.AttendanceSpringBootBackend.controller;

import com.geeks.AttendanceSpringBootBackend.entity.Leave;
import com.geeks.AttendanceSpringBootBackend.entity.User;
import com.geeks.AttendanceSpringBootBackend.service.LeaveInterface;
import com.geeks.AttendanceSpringBootBackend.service.impl.LeaveImplementation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;

@RestController
@RequestMapping("/leave")
public class LeaveController {

    @Autowired
    private LeaveInterface leaveInterface;

    @PostMapping
    public ResponseEntity<Leave> createLeave(@RequestBody Leave leave) {

        Leave newLeave = leaveInterface.createLeave(leave);
        System.out.println(leave);
        return ResponseEntity.status(HttpStatus.CREATED).body(newLeave);
    }
    @GetMapping
    public List<Leave> usersOnLeave(){

        return leaveInterface.usersOnLeave();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> oneUserLeave(@PathVariable long id) {
        try {
            Leave data = leaveInterface.onLeaveUser(id);
            return ResponseEntity.ok(data);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occured : " + "User not on leave");

        }

    }
}



