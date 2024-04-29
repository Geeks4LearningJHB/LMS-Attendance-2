package com.geeks.AttendanceSpringBootBackend.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;

@FeignClient(url = "http://localhost:1118/api/v1/userManagement/geeks", name = "user-management")
public interface UserFeignInterface {
    @GetMapping("/get/allGeeks")
    public ResponseEntity<?> getAllGeeks();
}
