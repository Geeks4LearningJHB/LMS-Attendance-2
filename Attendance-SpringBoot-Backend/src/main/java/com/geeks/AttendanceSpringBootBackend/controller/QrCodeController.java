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
import org.springframework.http.MediaType;
import org.springframework.web.bind.MissingRequestValueException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalTime;

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
    @PostMapping(path = "/generate/{attendanceId}", produces = MediaType.IMAGE_JPEG_VALUE)
    public void generateQrForAttendance(@PathVariable long attendanceId, HttpServletResponse response) throws
            MissingRequestValueException, WriterException, IOException {

        AttendanceResponseDto attendanceRecord = attendanceInterface.getAttendanceRecordById(attendanceId);
        if(attendanceRecord == null || attendanceRecord.getDate() == null || attendanceRecord.getLogInTime() == null ||
                attendanceRecord.getLogInLocation() == null) {
            throw new MissingRequestValueException("Attendance record data is incomplete");
        }
        String qrString = generateQrStringFromAttendanceRecord(attendanceRecord);
        qrCodeService.generateQr(qrString, response.getOutputStream());

        response.getOutputStream().flush();
    }
    @PostMapping("/decode")
    public DecodedQrResponseDto decodeQr(@RequestParam("qrCode") MultipartFile qrCode) throws IOException, NotFoundException {
        String qrCodeString =  qrCodeService.decodeQr(qrCode.getBytes());
        return new DecodedQrResponseDto(qrCodeString);
    }
    private String generateQrStringFromAttendanceRecord(AttendanceResponseDto attendanceRecord) {
        // Concatenating fields to form QR string
      LocalTime scanTime = LocalTime.now();
      String updateUrl = "http://localhost:8080/attendance/view-by-attendance-id/";
      if (attendanceRecord.isScanned()){
          return attendanceRecord.getName() + "Already scanned Thanks!";
      }
      return updateUrl + attendanceRecord.getId();
    }
    private LocalTime extractScanTimeFromQrString(String qrString) {
        int startIndex = qrString.indexOf("Scan Time: ") + "Scan Time: ".length();
        String scanTimeStr = qrString.substring(startIndex);

        // Assuming the scan time is in HH:mm:ss format
        int hour = Integer.parseInt(scanTimeStr.substring(0, 2));
        int minute = Integer.parseInt(scanTimeStr.substring(3, 5));
        int second = Integer.parseInt(scanTimeStr.substring(6, 8));

        return LocalTime.of(hour, minute, second);
    }

}
