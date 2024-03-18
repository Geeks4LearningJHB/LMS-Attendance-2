package com.geeks.AttendanceSpringBootBackend.swagger;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.method.HandlerTypePredicate;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
public class SwaggerConfig {
    //private HandlerTypePredicate.Builder RequestHandlerSelectors;

    @Bean
    public Docket api() {
        return new Docket(DocumentationType.SWAGGER_2)
                .groupName("attendance-api")
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.geeks.AttendanceSpringBootBackend.swagger"))
                .paths(PathSelectors.any()) .build();
    }
}