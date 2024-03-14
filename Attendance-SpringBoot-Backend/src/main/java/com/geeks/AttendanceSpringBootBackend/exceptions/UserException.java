package com.geeks.AttendanceSpringBootBackend.exceptions;

public class UserException  extends RuntimeException{
    private String message;

    public UserException(){
    }
    public UserException(String msg){
        super(msg);
        this.message = msg;
    }
}
