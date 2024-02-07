package com.geeks.AttendanceSpringBootBackend.service.impl;

import com.geeks.AttendanceSpringBootBackend.entity.UserDummy;
import com.geeks.AttendanceSpringBootBackend.repository.UserDummyRepository;
import com.geeks.AttendanceSpringBootBackend.service.UserDummyInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class UserDummyImplimentation implements UserDummyInterface {

    @Autowired
    UserDummyRepository userDummyRepository;

    @Override
    public UserDummy addNewUser(UserDummy userDummy) {
        return userDummyRepository.save(userDummy);
    }

    @Override
    public List<UserDummy> viewUsers() {
        return userDummyRepository.findAll();
    }
}
