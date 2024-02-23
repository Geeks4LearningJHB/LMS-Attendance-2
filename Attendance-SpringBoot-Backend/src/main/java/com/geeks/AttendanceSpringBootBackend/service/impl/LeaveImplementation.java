package com.geeks.AttendanceSpringBootBackend.service.impl;

import com.geeks.AttendanceSpringBootBackend.entity.Leave;
import com.geeks.AttendanceSpringBootBackend.entity.User;
import com.geeks.AttendanceSpringBootBackend.repository.LeaveRepository;
import com.geeks.AttendanceSpringBootBackend.service.LeaveInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LeaveImplementation implements LeaveInterface {

    @Autowired
    LeaveRepository leaveRepository;

    @Override
    public Leave createLeave(Leave leave) {



        return leaveRepository.save(leave);
    }

    @Override
    public Leave getLeaveType(String leaveType) {

        return null;

    }

    @Override
    public Boolean checkIsOnLeave() {
        return null;
    }

    @Override
    public List<Leave> usersOnLeave() {
        return leaveRepository.findUserByIsOnLeaveTrue();
    }


    public Leave onLeaveUser (long id){
        Leave leave = leaveRepository.findByUserUserIdAndIsOnLeaveTrue(id);
//        if (leave == null ){
//            throw new IllegalStateException("User not on leave");
//        }
       // Leave leave = leaveRepository.findByUserUserIdAndIsOnLeaveTrue(id);

       return leave;
    }



}
