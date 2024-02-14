package com.geeks.AttendanceSpringBootBackend.service;

import com.geeks.AttendanceSpringBootBackend.entity.Leave;


public interface LeaveInterface {
    Leave getLeaveType(String leaveType);
    Boolean checkIsOnLeave();

}
