package com.kimilguk.boot3.util;

import java.util.Date;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.http.HttpServletRequest;

@Controller
public class CustomErrorController implements ErrorController {
	@RequestMapping(value = "/error", method = { RequestMethod.GET })
	// 스프링4.3버전 이전에 사용하던 방식이다. 보통 스프링 부트에서는 @GetMapping("/error") 으로…
	public String handleError(HttpServletRequest request, Model model) {
		// HttpServletRequest 클래스는 에러와 이전 경로를 포함하는 http전송상태 정보를 가진다.
		Object status = request.getAttribute(RequestDispatcher.ERROR_STATUS_CODE);
		// 에러코드에 매칭되는 상세정보를 가져온다.(아래)
		HttpStatus httpStatus = HttpStatus.valueOf(Integer.valueOf(status.toString()));
		if (status != null) {
			// 이전 페이지로 돌아가는 링크 데이터 생성
			String referer = request.getHeader("Referer");
			// error.mustache 로 보내는 데이터를 model 에 담는다
			model.addAttribute("status", status.toString());
			model.addAttribute("message", httpStatus.getReasonPhrase());// http 응답구문 저장
			model.addAttribute("timestamp", new Date());
			model.addAttribute("prevPage", referer);// 에러 이전페이지 저장
		}
		return "/error/error";// error폴더에 error.mustache를 만든다.
	}
}
