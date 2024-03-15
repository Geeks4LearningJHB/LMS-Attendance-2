package com.geeks.AttendanceSpringBootBackend.entity.dto;

import org.springframework.web.multipart.MultipartFile;

public class DecodedQrRequestDto {
    private MultipartFile qrCode;

    public MultipartFile getQrCode() {
        return qrCode;
    }

    public void setQrCode(MultipartFile qrCode) {
        this.qrCode = qrCode;
    }
}
