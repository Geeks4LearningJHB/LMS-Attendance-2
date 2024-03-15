package com.geeks.AttendanceSpringBootBackend.exceptions;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public class ResponseObject<T> {
        private Integer statusCode;
        private String message;
        private T data;
    }

