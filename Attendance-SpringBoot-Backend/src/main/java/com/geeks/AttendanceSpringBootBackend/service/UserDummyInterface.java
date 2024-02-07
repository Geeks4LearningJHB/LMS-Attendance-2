package com.geeks.AttendanceSpringBootBackend.service;

import com.geeks.AttendanceSpringBootBackend.entity.UserDummy;

import java.util.List;

public interface UserDummyInterface {
    UserDummy  addNewUser(UserDummy userDummy);
    List<UserDummy> viewUsers();



}
