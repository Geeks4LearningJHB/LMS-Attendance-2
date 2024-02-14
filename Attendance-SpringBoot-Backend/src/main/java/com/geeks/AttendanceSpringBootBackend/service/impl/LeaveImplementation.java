package com.geeks.AttendanceSpringBootBackend.service.impl;

import com.geeks.AttendanceSpringBootBackend.entity.Leave;
import com.geeks.AttendanceSpringBootBackend.repository.LeaveRepository;
import com.geeks.AttendanceSpringBootBackend.service.LeaveInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LeaveImplementation implements LeaveInterface {

    @Autowired
    LeaveRepository leaveRepository;
    @Override
    public Leave getLeaveType(String leaveType) {

        return null;

    }

    @Override
    public Boolean checkIsOnLeave() {
        return null;
    }
}
