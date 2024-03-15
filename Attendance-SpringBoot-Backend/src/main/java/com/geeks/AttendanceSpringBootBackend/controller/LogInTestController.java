package com.geeks.AttendanceSpringBootBackend.controller;


import com.geeks.AttendanceSpringBootBackend.entity.AttendanceRecord;
import com.geeks.AttendanceSpringBootBackend.entity.User;
import com.geeks.AttendanceSpringBootBackend.entity.dto.AttendanceResponseDto;
import com.geeks.AttendanceSpringBootBackend.entity.dto.DecodedQrResponseDto;
import com.geeks.AttendanceSpringBootBackend.service.AttendanceInterface;
import com.geeks.AttendanceSpringBootBackend.service.AttendanceMapperInterface;
import com.geeks.AttendanceSpringBootBackend.service.impl.LogInTestImplementation;
import com.geeks.AttendanceSpringBootBackend.service.impl.QrCodeService;
import com.google.zxing.NotFoundException;
import com.google.zxing.WriterException;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.MissingRequestValueException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalTime;
import java.util.Optional;

@RestController
@RequestMapping("/login")
@CrossOrigin (origins = "http://localhost:4200/")
public class LogInTestController {

    @Autowired
    LogInTestImplementation logInTestImplementation;
    @Autowired
    AttendanceInterface attendanceInterface;
    @Autowired
    AttendanceMapperInterface attendanceMapperInterface;

    @Autowired
    private QrCodeService qrCodeService;

    @GetMapping("/login" )
    public Optional<User> testLogin(String email , String password){



        return logInTestImplementation.logInTester(email ,password);
    }




}
