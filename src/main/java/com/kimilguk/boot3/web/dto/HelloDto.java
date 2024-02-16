package com.kimilguk.boot3.web.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter // 선언된 모든 변수의 get메소드를 자동생성
@RequiredArgsConstructor // 클래스 내부에 final로 선언된 변수가 생성자의 Args(매개변수)로 자동 추가된다
public class HelloDto {
	// 멤버변수 선언
	private final String name;
	private final int amount;
	public HelloDto() {
		this.name = "";
		this.amount = 0;
	}
	
}
