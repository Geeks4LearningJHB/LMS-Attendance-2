package com.geeks.AttendanceSpringBootBackend.service.impl;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.geeks.AttendanceSpringBootBackend.entity.AttendanceRecord;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class TimeFetcherApi {

    public String getCurrentTimeInSouthAfrica() {

        String apiUrl = "https://www.timeapi.io/api/Time/current/zone?timeZone=africa/johannesburg";
        RestTemplate restTemplate = new RestTemplate();
        String jsonResponse = restTemplate.getForObject(apiUrl, String.class);

        // Parse JSON response and extract time
        ObjectMapper mapper = new ObjectMapper();
        try {
            JsonNode root = mapper.readTree(jsonResponse);
            String time = root.get("time").asText();
            String date = root.get("date").asText();

            String dateTime = date+ "/" + time;
         // String time1  =  dateTime.substring(dateTime.lastIndexOf('/') + 1);


            return dateTime;
        } catch (Exception e) {
            e.printStackTrace();
            return "Error fetching time.";
        }
    }










}
