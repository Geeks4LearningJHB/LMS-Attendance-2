package com.geeks.AttendanceSpringBootBackend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

@RestController
public class TimeController {

    @GetMapping("/current-time")
    public String getCurrentTimeInSouthAfrica() {

        String apiUrl = "https://www.timeapi.io/api/Time/current/zone?timeZone=africa/johannesburg";
        RestTemplate restTemplate = new RestTemplate();
        String jsonResponse = restTemplate.getForObject(apiUrl, String.class);

        ObjectMapper mapper = new ObjectMapper();
        try {
            JsonNode root = mapper.readTree(jsonResponse);
            String time = root.get("time").asText();
            String date = root.get("date").asText();

            String dateTime = date+ "/" + time;
            String time1  =  dateTime.substring(dateTime.lastIndexOf('/') + 1);
            LocalTime localTime = LocalTime.now();

            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm");
           String formmatted  =  localTime.format(formatter);

            System.out.println(formmatted);
            if (time1.equals(formmatted)){
                return time1;
            }else{
                return "Why did you change your time Boss!!";
            }

        } catch (Exception e) {
            e.printStackTrace();
            return "Error fetching time.";
        }
    }
}

