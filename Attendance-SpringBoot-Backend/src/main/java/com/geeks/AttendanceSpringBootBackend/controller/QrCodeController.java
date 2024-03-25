package com.geeks.AttendanceSpringBootBackend.controller;

import com.geeks.AttendanceSpringBootBackend.entity.AttendanceRecord;
import com.geeks.AttendanceSpringBootBackend.entity.dto.AttendanceResponseDto;
import com.geeks.AttendanceSpringBootBackend.entity.dto.DecodedQrResponseDto;
import com.geeks.AttendanceSpringBootBackend.entity.dto.GenerateQrRequestDto;
import com.geeks.AttendanceSpringBootBackend.service.AttendanceInterface;
import com.geeks.AttendanceSpringBootBackend.service.impl.QrCodeService;
import com.google.zxing.NotFoundException;
import com.google.zxing.WriterException;
import com.sun.tools.javac.Main;
import jakarta.servlet.http.HttpServletResponse;
import lombok.Data;
import lombok.AllArgsConstructor;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MissingRequestValueException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

@Data
@AllArgsConstructor
@RestController
@RequestMapping("/api/attendance")
public class QrCodeController {

    @Autowired
    private QrCodeService qrCodeService;
    @Autowired
    private AttendanceInterface attendanceInterface;

    private static final Logger logger = LogManager.getLogger(Main.class);
    @GetMapping(path = "/generate/{attendanceId}", produces = MediaType.IMAGE_JPEG_VALUE)
    public ResponseEntity<byte[]> generateQrForAttendance(@PathVariable long attendanceId, HttpServletResponse response) throws
            MissingRequestValueException, WriterException, IOException {
    logger.info("QR METHOD TRIGGERED");
        AttendanceResponseDto attendanceRecord = attendanceInterface.getAttendanceRecordById(attendanceId);
        if(attendanceRecord == null || attendanceRecord.getDate() == null || attendanceRecord.getLogInTime() == null ||
                attendanceRecord.getLogInLocation() == null) {
            throw new MissingRequestValueException("Attendance record data is incomplete");
        }
        String qrString = generateQrStringFromAttendanceRecord(attendanceRecord);
        qrCodeService.generateQr(qrString);
        response.getOutputStream().flush();

        byte[] qrImageBytes = qrCodeService.generateQr(qrString) ;

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_JPEG);
        headers.setContentLength(qrImageBytes.length);

        return new ResponseEntity<>(qrImageBytes, headers, HttpStatus.OK);
    }
    @PostMapping("/decode")
    public DecodedQrResponseDto decodeQr(@RequestParam("qrCode") MultipartFile qrCode) throws IOException, NotFoundException {
        String qrCodeString =  qrCodeService.decodeQr(qrCode.getBytes());
        return new DecodedQrResponseDto(qrCodeString);
    }
    private String generateQrStringFromAttendanceRecord(AttendanceResponseDto attendanceRecord) {
        // Concatenating fields to form QR string
      String updateUrl = "http://localhost:8080/attendance/scan-by-attendance-id/";
      if (attendanceRecord.isScanned()){
          return attendanceRecord.getName() + "Already scanned Thanks!";
      }
      return updateUrl + attendanceRecord.getId();
    }

}
