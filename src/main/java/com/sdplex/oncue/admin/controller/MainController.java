package com.sdplex.oncue.admin.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import com.sdplex.oncue.admin.entity.User;
import com.sdplex.oncue.admin.repository.UserRepository;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @author goldbug
 * 메인 컨트롤러(로그인, 로그아웃, 페이지 등)
 */
@Controller
@RequestMapping("/")
public class MainController {

    @Autowired
    private UserRepository userRepository;

	/*
	@GetMapping({ "/", "/signin", "/login" })
	public String signin() {
		return "signin";
	}
	*/

    @GetMapping({"/", "/dashboard"})
    public String mainUser() {
        return "dashboard";
    }

    @GetMapping("/management")
    public String oncueManagement() {
        return "management";
    }

    @GetMapping("/management/detail")
    public String oncueInformation() {
        return "detail";
    }

    @GetMapping("/test")
    public Iterable<User> getUsers() {
        return userRepository.findAll();
    }

}
