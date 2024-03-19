package com.geeks.AttendanceSpringBootBackend.service.impl;

import com.geeks.AttendanceSpringBootBackend.entity.AttendanceRecord;
import com.geeks.AttendanceSpringBootBackend.entity.User;
import com.geeks.AttendanceSpringBootBackend.entity.dto.AttendanceResponseDto;
import com.geeks.AttendanceSpringBootBackend.repository.AttendanceRepository;
import com.geeks.AttendanceSpringBootBackend.repository.UserRepository;
import com.geeks.AttendanceSpringBootBackend.service.AdminInterface;
import org.springframework.stereotype.Service;
import com.geeks.AttendanceSpringBootBackend.service.IpAdressInterface;
import org.springframework.beans.factory.annotation.Autowired;


import java.util.Optional;

@Service
public class AdminServiceImplimentation implements AdminInterface {

//    private static final Logger logger = LogManager.getLogger(Main.class);

    @Autowired
    private AttendanceRepository attendanceRepository;
    @Autowired
    private  UserRepository userRepository;
    @Autowired
    private AttendanceMapperServiceImpl attendanceDtoMapper;
    @Autowired
    private LoginTimeChecker loginTimeChecker;
    @Autowired
    private IpAdressInterface ipAdressInterface;
    @Autowired
    private TimeFetcherApi timeFetcherApi;

//@Autowired
//public AdminServiceImplimentation(UserRepository userRepository) {

    @Override
    //Update method
    public User updateUser (long id, User userDetails){
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isPresent()) {
            User existingUser = userOptional.get();
            // Assuming userId cannot be updated
            existingUser.setUsername(userDetails.getUsername());
            existingUser.setEmail(userDetails.getEmail());

            return userRepository.save(existingUser);

        } else {
            // handle not found scenario
            throw new RuntimeException("User not found");
        }
    }

    @Override
    public AttendanceResponseDto getAttendanceRecordById(long id) {
        Optional<AttendanceRecord> attendanceRecordOptional = attendanceRepository.findById(id);
        if (attendanceRecordOptional.isPresent()) {

            return  attendanceDtoMapper.mapToDto(attendanceRecordOptional.get());
        } else {
            // handle not found scenario
            return null;
        }
    }


    @Override
    public void deleteAttendanceRecord(long id) {
        attendanceRepository.deleteById(id);

    }
}
