package com.geeks.AttendanceSpringBootBackend.exceptions;
import jdk.jshell.spi.ExecutionControl;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;


@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(value= AttendanceExceptions.class)
    public @ResponseBody ErrorResponse handleAttendanceException(AttendanceExceptions e) {
        return new ErrorResponse(HttpStatus.NOT_FOUND.value(), e.getMessage());
    }
    @ExceptionHandler(value = ExecutionControl.UserException.class)
    public @ResponseBody ErrorResponse handleUserException(ExecutionControl.UserException e){
        return new ErrorResponse(HttpStatus.NOT_FOUND.value(), e.getMessage());
    }
}
