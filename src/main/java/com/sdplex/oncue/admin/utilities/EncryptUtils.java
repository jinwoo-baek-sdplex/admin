package com.sdplex.oncue.admin.utilities;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

/**
 * @author goldbug
 * 암호화 도구
 */
public class EncryptUtils {

	public static final int KEY_SIZE = 512;

	/**
	 * sha256 암호화
	 * @param plainText
	 * @return
	 */
	public static String encryptSHA256(String plainText) {
		String cipherText = "";

		try {
			MessageDigest sha = MessageDigest.getInstance("SHA-256");
			sha.update(plainText.getBytes());
			byte digestByte[] = sha.digest();
			StringBuffer sb = new StringBuffer();
			for (int i = 0; i < digestByte.length; i ++) {
				sb.append(Integer.toString((digestByte[i] & 0xff) + 0x100, 16).substring(1));
			}
			cipherText = sb.toString();
		} catch (NoSuchAlgorithmException e) {
			e.addSuppressed(e);
			cipherText = null;
		}

		return cipherText;
	}

}
