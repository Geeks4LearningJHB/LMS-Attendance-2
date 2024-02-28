package com.geeks.AttendanceSpringBootBackend.service.impl;

import com.geeks.AttendanceSpringBootBackend.service.IpAdressInterface;
import com.sun.tools.javac.Main;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.core.util.JsonUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.InetAddress;
import java.net.URL;
import java.net.UnknownHostException;


@Service
public class IpAddressServiceImplementation implements IpAdressInterface {
    private static final Logger logger = LogManager.getLogger(Main.class);

    @Value("${office.range.start}")
    private String officeRangeStart;

    @Value("${office.range.end}")
    private String officeRangeEnd ;
    String systemPublicIp = null;

    @Override
    public String getSystemIp(){

    try {
     URL url = new URL("https://api.ipify.org");
        BufferedReader reader = new BufferedReader(new InputStreamReader(url.openStream()));
      systemPublicIp = reader.readLine();
     reader.close();
    } catch (IOException e) {
    logger.error("Couldn't get system's IP user might be using VPN " , e);
    }
    return systemPublicIp;
    }



    @Override
    public String getLocation() {
        try {
            InetAddress ip = InetAddress.getByName(getSystemIp());
            InetAddress start = InetAddress.getByName(officeRangeStart);
            InetAddress end = InetAddress.getByName(officeRangeEnd);
            logger.info(systemPublicIp);
            if (isInRange(ip, start, end)) {
                return "Office";
            } else {
                return "Home";
            }
        } catch (UnknownHostException e) {
            // Handle unknown IP
            return "Unknown IP";
        }
    }

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
