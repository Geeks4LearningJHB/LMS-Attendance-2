package com.geeks.AttendanceSpringBootBackend.service;

import java.net.InetAddress;

public interface IpAdressInterface {
    boolean isInRange(InetAddress ip, InetAddress start, InetAddress end);
    String getLocation(String ipAddress);




}
