package com.geeks.AttendanceSpringBootBackend.service.impl;

import com.geeks.AttendanceSpringBootBackend.entity.User;
import com.geeks.AttendanceSpringBootBackend.entity.dto.UserResponseDTO;
import com.geeks.AttendanceSpringBootBackend.repository.UserRepository;
import com.geeks.AttendanceSpringBootBackend.service.UserInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


@Service
public class UserServiceImplimentation implements UserInterface {


    @Autowired
    UserRepository userRepository;

    public UserResponseDTO mapToDto(User user) {
        UserResponseDTO userResponse = new UserResponseDTO();
        userResponse.setUserId(user.getUserId());
        userResponse.setUserName(user.getUserName());
        userResponse.setUserSurname(user.getUserSurname());
        userResponse.setEmail(user.getEmail());
        userResponse.setSponsor(user.getSponsor());
        return userResponse;
    }


    @Override
    public User addNewUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public List<UserResponseDTO> viewUsers() {

        List<User> users = userRepository.findAll();
        return users.stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }
    @Override
    public List<UserResponseDTO> allGeeks(){
            List<User> geeks = userRepository.findAllByRole("Learner");
            return geeks.stream()
                    .map(this::mapToDto)
                    .collect(Collectors.toList());
    }

}
