package com.sdplex.oncue.admin.entity;

import java.time.Instant;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

/**
 * @author goldbug
 * 사용자 정보
 */
@Table("TB_USER_INFO")
@AllArgsConstructor
@Getter
@Setter
public class User {

	@Id
	private Integer seq;
	private String id;
	private String password;
	private String name;
	private String authority;
	private String isDeleted;
	private Instant createdDate;
	private Instant updatedDate;

}
