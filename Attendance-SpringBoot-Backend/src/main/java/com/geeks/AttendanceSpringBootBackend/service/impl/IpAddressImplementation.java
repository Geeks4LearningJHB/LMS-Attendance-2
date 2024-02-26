package com.geeks.AttendanceSpringBootBackend.service.impl;

import com.geeks.AttendanceSpringBootBackend.service.IpAdressInterface;
import org.springframework.stereotype.Service;

import java.net.InetAddress;
import java.net.UnknownHostException;

@Service
public class IpAddressImplementation implements IpAdressInterface {

    @Override
    public String getLocation(String ipAddress) {
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
            System.out.println(ipAddress);
            return "Unknown Ip";
        }
    }

    @Override
    public boolean isInRange(InetAddress ip, InetAddress start, InetAddress end) {
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
