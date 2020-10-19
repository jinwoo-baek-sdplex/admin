_common = {
		/**
		 * Ajax Wrapper
		 *
		 * Parameter Option Object
		 * 필수) URL - 전송 URL (String)
		 * 필수) PARAM - 전송 파라미터 (String or Object)
		 * 필수) CALLBACK - 콜백함수 (Function)
		 * 필수) TYPE - 전송 방식 (POST, GET, PUT, DELETE)
		 * 선택) DATA_TYPE - 응답받을 데이터 타입 (String)
		 * 선택) CONTENT_TYPE - 전송할 데이터 타입 (String)
		 * 선택) ASYNC - 비동기 여부 (boolean : 미지정시 true)
		 * 선택) ERROR_CALLBACK - 전송 실패 시 콜백 함수 (Function)
		 * 선택) ERRORMSG - 전송 실패시 메시지 (String)
		 * 선택) RETURN_INCLUDE - 요청시 포함시키면 결과에 포함됨 (Object)
		 */

		callAjax : function(options) {
			if (options.URL != null) {
				if (options.ASYNC == null) {
					options.ASYNC = true;
				}
				//options.URL = getContextPath() + options.URL;

				$.ajax({
					type		:	options.TYPE,
					url			:	options.URL,
					traditional	:	true,
					data		:	options.PARAM,
					async		:	options.ASYNC,
					headers		:   {"X-AUTH-TOKEN" : localStorage.getItem("token")},
					dataType	:	options.DATA_TYPE,
					contentType : 	options.CONTENT_TYPE,
					success		:	function(result) {
										options.CALLBACK(result, options.RETURN_INCLUDE || {});
									},
					error		:	function(result) {
										if (options.ERROR_CALLBACK != undefined) {
											if (result.responseJSON != undefined) {
												options.ERROR_CALLBACK(result.responseJSON);
											} else {
												options.ERROR_CALLBACK(result);
											}
										} else if (options.ERRORMSG != null) {
											alert(options.ERRORMSG);
										} else {
											alert("서버에 요청중 문제가 발생했습니다.\n관리자에게 문의하여 주십시오.");
										}
									}
				});
			} else {
				alert("올바른 요청이 아닙니다.");
				return false;
			}
		}
}