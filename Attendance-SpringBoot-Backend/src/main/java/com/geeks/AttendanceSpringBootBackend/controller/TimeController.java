package com.geeks.AttendanceSpringBootBackend.controller;

import com.geeks.AttendanceSpringBootBackend.service.impl.TimeFetcherApi;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

@RestController
public class TimeController {

    @Autowired
    TimeFetcherApi timeFetcherApi;

    @GetMapping("/current-time")
    public String getCurrentTimeInSouthAfrica() {

        String time = timeFetcherApi.getCurrentTimeInSouthAfrica();
        String date = timeFetcherApi.getCurrentDateInSouthAfrica();
//    }else{
//        return "Why did you change your time Boss!!";
//    }
//
//} catch (Exception e) {
//        e.printStackTrace();
//        return "Error fetching time.";
//        }
//        }

        return time + date;
    }
}
