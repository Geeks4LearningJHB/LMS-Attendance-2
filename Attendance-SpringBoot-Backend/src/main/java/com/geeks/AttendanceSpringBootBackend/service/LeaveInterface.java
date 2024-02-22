package com.geeks.AttendanceSpringBootBackend.service;

import com.geeks.AttendanceSpringBootBackend.entity.Leave;
import com.geeks.AttendanceSpringBootBackend.entity.User;
import org.springframework.stereotype.Service;

import java.util.List;


public interface LeaveInterface {



    Leave createLeave(Leave leave);
    Leave getLeaveType(String leaveType);
    Boolean checkIsOnLeave();
    List<Leave> usersOnLeave();
   Leave onLeaveUser (long id);


}
