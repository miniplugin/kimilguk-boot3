package com.kimilguk.boot3.web;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController//Json 텍스트값을 반환하는 RestAPI 방식으로 빈이 등록 됨 
public class HelloController {
	   @GetMapping("/hello")//웹 요청을 받는 API로 지정
	   //위 경로 지정 후 /hello 로 API경로를 변경해본다.
	   public String hello() {
	      return "Hello";
	   }
}
