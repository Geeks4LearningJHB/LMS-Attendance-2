# Use a base image with OpenJDK installed
FROM openjdk:8

# Expose the port your application runs on
EXPOSE 8080

COPY target/spring-boot-docker.jar spring-boot-docker.jar

RUN ls -l /target   # Add this line for debugging

# Define the command to run your application
ENTRYPOINT ["java","-jar","/spring-boot-docker.jar"]
