package com.geeks.AttendanceSpringBootBackend.entity.dto;


import com.geeks.AttendanceSpringBootBackend.entity.AttendanceRecord;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DecodedQrResponseDto {

    private String qrString;
    public DecodedQrResponseDto() {

    }
    public String getQrString() {
        return qrString;
    }

    public void setQrString(String qrString) {
        this.qrString = qrString;
    }
}
