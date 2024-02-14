package com.kimilguk.boot3;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
public class KimilgukBoot3Application {

	public static void main(String[] args) {
		SpringApplication.run(KimilgukBoot3Application.class, args);
	}

}
