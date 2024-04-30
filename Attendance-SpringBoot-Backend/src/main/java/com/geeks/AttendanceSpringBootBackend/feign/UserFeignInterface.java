package com.geeks.AttendanceSpringBootBackend.feign;

import com.geeks.AttendanceSpringBootBackend.entity.dto.Geek;
import com.geeks.AttendanceSpringBootBackend.entity.dto.SponsorDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@FeignClient(url = "http://localhost:1118/api/v1/userManagement", name = "user-management")
public interface UserFeignInterface {
    @GetMapping("/geeks/get/allGeeks")
    ResponseEntity<List<Geek>> getAllGeeks();

    @GetMapping("/geeks/get/geeksBy/{id}")
    ResponseEntity<Geek> getGeekNameById(@PathVariable String id);
    @GetMapping("/admins/sponsor/{userId}")
    ResponseEntity<SponsorDto> getSponsorNameByGeekId(@PathVariable String userId);

}
