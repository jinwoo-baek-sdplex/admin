package com.sdplex.oncue.admin.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sdplex.oncue.admin.entity.User;
import com.sdplex.oncue.admin.repository.UserRepository;

/**
 * @author goldbug
 *
 */
@RestController
@RequestMapping("/user")
public class UserController {

	@Autowired
	private UserRepository userRepository;

	@GetMapping("/test")
	public Iterable<User> getUsers() {
		return userRepository.findAll();
	}

}
