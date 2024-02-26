package com.geeks.AttendanceSpringBootBackend.service;

import com.geeks.AttendanceSpringBootBackend.entity.Leave;
import com.geeks.AttendanceSpringBootBackend.entity.User;
import org.springframework.stereotype.Service;

import java.util.List;


public interface LeaveInterface {



    Leave createLeave(Leave leave);

    List<Leave> usersOnLeave();
   Leave onLeaveUser (long id);
   boolean isOnLeave(long userId);


}
