package com.sdplex.oncue.admin;

import org.junit.jupiter.api.Test;

import com.sdplex.oncue.admin.utilities.EncryptUtils;

class JavaTest {

	@Test
	void testEncryptSHA256() {
		System.out.println(EncryptUtils.encryptSHA256("sdplex1!"));
	}

}
