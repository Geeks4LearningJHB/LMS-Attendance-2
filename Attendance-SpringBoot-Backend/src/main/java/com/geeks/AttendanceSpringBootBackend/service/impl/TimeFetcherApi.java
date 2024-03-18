package com.geeks.AttendanceSpringBootBackend.service.impl;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.geeks.AttendanceSpringBootBackend.entity.AttendanceRecord;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class TimeFetcherApi {
    String apiUrl = "https://www.timeapi.io/api/Time/current/zone?timeZone=africa/johannesburg";

    public String getCurrentTimeInSouthAfrica() {
        RestTemplate restTemplate = new RestTemplate();
        String jsonResponse = restTemplate.getForObject(apiUrl, String.class);
        // Parse JSON response and extract time
        ObjectMapper mapper = new ObjectMapper();
        try {
            JsonNode root = mapper.readTree(jsonResponse);
            String time = root.get("time").asText();
       //String time1  =  dateTime.substring(dateTime.lastIndexOf('/') + 1);

            return time;
        } catch (Exception e) {
            e.printStackTrace();
            return "Error fetching time.";
        }
        }
    public String getCurrentDateInSouthAfrica() {
        RestTemplate restTemplate = new RestTemplate();
        String jsonResponse = restTemplate.getForObject(apiUrl, String.class);
        // Parse JSON response and extract time
        ObjectMapper mapper = new ObjectMapper();
        try {
            JsonNode root = mapper.readTree(jsonResponse);
            String date = root.get("date").asText();
            String currentDate = date;
            // String time1  =  dateTime.substring(dateTime.lastIndexOf('/') + 1);
            return currentDate;
        } catch (Exception e) {
            e.printStackTrace();
            return "Error fetching time.";
        }
    }
}

