package com.sdplex.oncue.admin.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * @author goldbug
 * 샘플 컨트롤러
 */
@RestController
@RequestMapping("/sample")
public class SampleController {

	private final SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

	@GetMapping("/onCueLog")
	public String getOnCueLog() {
		return  sdf.format(new Date()) + " [restartedMain] o.s.s.web.DefaultSecurityFilterChain ";
	}
}
