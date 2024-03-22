package com.geeks.AttendanceSpringBootBackend.controller;


import com.geeks.AttendanceSpringBootBackend.entity.AttendanceRecord;
import com.geeks.AttendanceSpringBootBackend.entity.User;
import com.geeks.AttendanceSpringBootBackend.entity.dto.AttendanceResponseDto;
import com.geeks.AttendanceSpringBootBackend.entity.dto.DecodedQrResponseDto;
import com.geeks.AttendanceSpringBootBackend.entity.dto.LogInRequestDTO;
import com.geeks.AttendanceSpringBootBackend.service.AttendanceInterface;
import com.geeks.AttendanceSpringBootBackend.service.AttendanceMapperInterface;
import com.geeks.AttendanceSpringBootBackend.service.impl.LogInTestImplementation;
import com.geeks.AttendanceSpringBootBackend.service.impl.QrCodeService;
import com.google.zxing.NotFoundException;
import com.google.zxing.WriterException;
import com.sun.tools.javac.Main;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.MissingRequestValueException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalTime;
import java.util.Optional;

@RestController
@RequestMapping("/user")
public class LogInTestController {
    private static final Logger logger = LogManager.getLogger(Main.class);

    @Autowired
    LogInTestImplementation logInTestImplementation;
    @Autowired
    AttendanceInterface attendanceInterface;
    @Autowired
    AttendanceMapperInterface attendanceMapperInterface;

    @Autowired
    private QrCodeService qrCodeService;

    @PostMapping("/login" )
    public Optional<User> testLogin(@RequestBody LogInRequestDTO logInRequestDTO){

       logger.info(logInRequestDTO);
        return logInTestImplementation.logInTester(logInRequestDTO);
    }

    @GetMapping("user/check-remotely")
    public boolean checkRemotely(@PathVariable long attendanceId){
        return logInTestImplementation.checkRemotely(attendanceId);
    }

}
