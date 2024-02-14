package com.kimilguk.boot3;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
public class KimilgukBoot3Application {
	//현재 앱의 진입 메소드가 자동 생성 된다.
	public static void main(String[] args) {
		SpringApplication.run(KimilgukBoot3Application.class, args);
	}

}
