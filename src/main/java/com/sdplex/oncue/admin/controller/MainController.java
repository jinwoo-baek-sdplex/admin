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
public class MainController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping({"/", "/login"})
    public String logIn() {
        return "login";
    }

    @GetMapping("/passwordChange")
    public String passwordChange() {
        return "passwordChange";
    }

    @GetMapping("/dashboard")
    public String dashboard() {
        return "dashboard";
    }

    // OnCue Detail 페이지 호출
    @GetMapping("/detail")
    public String onCueDetail() {
        return "detail";
    }

    // NotificationBox 페이지 호출
    @GetMapping("/notificationBox")
    public String notificationBox() {
        return "notificationBox";
    }

    // Notification Setting 페이지 호출
    @GetMapping("/notificationSetting")
    public String notificationSetting() {
        return "notificationSetting";
    }

    // OnCue Log Monitoring 페이지 호출
    @GetMapping("/logMonitoring")
    public String logMonitoring() {
        return "logMonitoring";
    }

    // OnCue Log Download 페이지 호출
    @GetMapping("/logDownload")
    public String logDownload() {
        return "logDownload";
    }

    // OnCue User Management 페이지 호출
    @GetMapping("/userManagement")
    public String userManagement() {
        return "userManagement";
    }

    @GetMapping("/test")
    public Iterable<User> getUsers() {
        return userRepository.findAll();
    }

}
