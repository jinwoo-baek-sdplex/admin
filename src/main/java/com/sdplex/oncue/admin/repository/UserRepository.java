package com.sdplex.oncue.admin.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Component;

import com.sdplex.oncue.admin.entity.User;

/**
 * @author goldbug
 *
 */
@Component
public interface UserRepository extends CrudRepository<User, Integer> {

}
