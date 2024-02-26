package com.geeks.AttendanceSpringBootBackend.service.impl;

import com.geeks.AttendanceSpringBootBackend.entity.AttendanceRecord;
import com.geeks.AttendanceSpringBootBackend.repository.AttendanceRepository;
import com.geeks.AttendanceSpringBootBackend.service.AttendanceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.net.InetAddress;
import java.net.UnknownHostException;
@Service
public class AttendanceImplementation implements AttendanceInterface {

    @Autowired
    private AttendanceRepository attendanceRepository;

    @Override
    public AttendanceRecord[] attendanceList() {
        return new AttendanceRecord[0];
    }

    @Override
    public AttendanceRecord newAttendance(AttendanceRecord attendance) {
        String ipAddress = attendance.getIpAddress();
        String location = getLocation(ipAddress);
        attendance.setLogInLocation(location);

        // records to the database

        return attendanceRepository.save(attendance);
    }

    private String getLocation(String ipAddress) {
        String officeRangeStart = "41.160.85.0";
        String officeRangeEnd = "41.160.85.255";

        try {
            InetAddress ip = InetAddress.getByName(ipAddress);
            InetAddress start = InetAddress.getByName(officeRangeStart);
            InetAddress end = InetAddress.getByName(officeRangeEnd);

            if (isInRange(ip, start, end)) {
                return "Office";
            } else {
                return "Home";
            }
        } catch (UnknownHostException e) {
            // Handle unknown Ip
            return "Unknown";
        }
    }

    private boolean isInRange(InetAddress ip, InetAddress start, InetAddress end) {
        byte[] ipBytes = ip.getAddress();
        byte[] startBytes = start.getAddress();
        byte[] endBytes = end.getAddress();

        for (int i = 0; i < ipBytes.length; i++) {
            int ipByte = ipBytes[i] & 0xFF;
            int startByte = startBytes[i] & 0xFF;
            int endByte = endBytes[i] & 0xFF;

            if (ipByte < startByte || ipByte > endByte) {
                return false;
            }
        }
        return true;
    }
}
