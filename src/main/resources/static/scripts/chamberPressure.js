/*
 * 종합현황 > 챔버압력 script file
 */

/***************************************
 * 전역변수 설정
 ***************************************/
// 챔버압력 화면처리 객체

/***************************************
 * 로딩 후 실행
 ***************************************/
$(document).ready(function(){
	//ChamberPressure.onLoad();
});

/***************************************
 * 언로딩 전 실행
 ***************************************/
$(window).on("beforeunload", function() {
	ChamberPressure.stopEvent();
});

/***************************************
 * 기타 함수들
 ***************************************/

/*
 * 챔버압력 클래스
 */
var ChamberPressure = (function(ChamberPressure, ajax, $, sse) {
	// private 변수 정의
	var toggleOnBtn = "pressure";
	var param = {};
	var options = {
		URL: "",
		PARAM: null, // TYPE get 을 제외하고 JSON.stringify 처리 필요
		CALLBACK: function (response) {
			if (response.success) {
				snapshotInstance.set(response.list);
			} else {
				alert(msg);
			}
		},
		ERROR_CALLBACK: function (response) {
			alert(response.msg);
		},
		TYPE: null, // 설정해줘야 함
		DATA_TYPE: "json",
		CONTENT_TYPE: "application/json; charset=utf-8;"
	};

	// 챔버Obj 라인별
	var chamberObj = {};

	// 최대값만 보여주기위한 변수
	var pressureObj = {};
	var beforeChamberNoByLineNo = {};

	// param 과 options 를 사용하여 ajax 전송한다.
	function send(option) {
		ajax.callAjax(option);
	};

	// getLoad 에서 사용되는 callback
	function allPressureCallback(response) {
		if (response.success) {
			setLastUpdate(response.data.TIME_DATA);
			for (key in response.data.GOODS_DATA) {
				document.getElementById(key).innerHTML = response.data.GOODS_DATA[key];
			}
			document.getElementById("pressureTable").innerHTML = response.data.TABLE_DATA;
			/* 운전 상태 하단 footer 로 이동
			for (key in response.data.RUN_FLAG) {
				if (key.length == 2) {
					//document.getElementById(key).classList.remove("run");
					//document.getElementById(key).classList.remove("stop");
					if (response.data.RUN_FLAG[key] == "1") {
						document.getElementById(key).classList.add("run");
					} else {
						document.getElementById(key).classList.add("stop");
					}
				}
			}
			*/
			for (key in response.data.SS_TIME) {
				if (response.data.SS_TIME[key] != null) {
					document.getElementById(key + "_SS_TIME").innerHTML = "[" + response.data.SS_TIME[key] + "s]";
				}
			}
		} else {
			alert(response.msg);
		}
	};

	function getAllPressure() {
		var option = deepExtend(options);
		option.URL = "/overallStatus/pressureInAll";
		option.TYPE = "get";
		option.CALLBACK = allPressureCallback;
		send(option);
	};

	function eventCallback(response) {
		var resultData;
		try {
			resultData = JSON.parse(response.data);
			for (key in resultData.GOODS_DATA) {
				document.getElementById(key).innerHTML = resultData.GOODS_DATA[key];
			}
			setLastUpdate(resultData.CHANGED_DATA.TIME);
			var lineNo = "";
			$.each(resultData.CHANGED_DATA, function(key, value) {
				if (key.indexOf("_SS_TIME") > 0 && value != null) {
					document.getElementById(key).innerHTML = "[" + value + "s]";
				} else if (key.indexOf("Current") > 0) {
					chamberObj[key.split("_Current")[0]] = value;
				}
			});
			var preChamberNo;
			$.each(chamberObj, function(key, value) {
				preChamberNo = value == "01" ? "16" : addZero(value - 1);
				setTableValue(key + "_" + preChamberNo, resultData.CHANGED_DATA[key + "_" + preChamberNo], false);
				setTableValue(key + "_" + value, resultData.CHANGED_DATA[key + "_" + value], true);
			});

			/*
			for (key in resultData.RUN_FLAG) {
				if (key.length == 2) {
					document.getElementById(key).classList.remove("run");
					document.getElementById(key).classList.remove("stop");
					if (resultData.RUN_FLAG[key] == "1") {
						document.getElementById(key).classList.add("run");
					} else {
						document.getElementById(key).classList.add("stop");
					}
				}
			}
			*/
		} catch(e) {
			console.log(e);
		};
	};

	/*
	 * 최종 업데이트 세팅
	 */
	function setLastUpdate(timeString) {
		document.getElementById("updatedDate").innerHTML = timeString;
	};

	/*
	 * 실시간 조회 값 세팅 및 색상 설정
	 */
	function setTableValue(id, value, colorFlag) {
		//value = 3.8; // 값 고정
		var targetObj = document.getElementById(id);
		if (toggleOnBtn == "temperature") {
			targetObj.setAttribute("pressure", value);
			targetObj.innerHTML = pressureToTemperature(value);
		} else {
			targetObj.innerHTML = value;
		}
		if (colorFlag) {
			$(targetObj).addClass("blue_bg");
		} else {
			$(targetObj).removeClass("blue_bg");
		}
	}

	var stopCallback = function(response) {
		if (response.success) {
			//alert("실시간 조회를 종료했습니다.");
		}
	};

	function startEvent() {
		sse.init("OverallStatus.ChamberPressure.ChangedPressure", 1000, eventCallback, stopCallback);
		sse.start();
	};

	function stopEvent() {
		$(".blue_bg").removeClass("blue_bg");
		sse.stop();
	}

	// 압력을 온도로 변환
	function pressureToTemperature(pressure) {
		var pressureX1 = parseFloat(pressure);
		var pressureX2 = Math.pow(pressureX1, 2);
		var pressureX3 = Math.pow(pressureX1, 3);
		var pressureX4 = Math.pow(pressureX1, 4);
		var result = (-0.0692 * pressureX4) + (0.9842 * pressureX3) + (-5.8486 * pressureX2) + (24.867 * pressureX1) + 100.2;
		return result.toFixed(2);
	}

	function onToggleCalc(type) {
		var lineNo = "";
		var chamberNo = "";
		var tdObj_A = null;
		var tdObj_B = null;
		for (var i = 1; i <= 16; i ++ ) {
			for (var j = 6; j <= 11; j ++ ) {
				lineNo = j.toString().lpad("0", 2);
				chamberNo = i.toString().lpad("0", 2);
				tdObj_A = document.getElementById(lineNo + "_A_" + chamberNo);
				tdObj_B = document.getElementById(lineNo + "_B_" + chamberNo);
				if (type == "temperature") {
					tdObj_A.setAttribute("pressure", tdObj_A.innerHTML);
					tdObj_A.innerHTML = pressureToTemperature(tdObj_A.innerHTML);
					tdObj_B.setAttribute("pressure", tdObj_B.innerHTML);
					tdObj_B.innerHTML = pressureToTemperature(tdObj_B.innerHTML);
				} else {
					tdObj_A.innerHTML = tdObj_A.getAttribute("pressure");
					tdObj_B.innerHTML = tdObj_B.getAttribute("pressure");
				}
			}
		}
	}

	// public 변수 및 함수 정의
	/*
	 * 페이지 로딩 시 챔버압력 조회
	 */
	ChamberPressure.onLoad = function() {
		$("#pressure").addClass("on");
		return getAllPressure();
	}

	/*
	 * 실시간 조회 시 데이터 조회 및 버튼 세팅
	 */
	ChamberPressure.realtimeSearch = function(btnObj) {
		if (btnObj.className.indexOf("active") > 0) {
			setRealtime(btnObj, false);
			stopEvent();
		} else {
			setRealtime(btnObj, true);
			startEvent();
		}
	}

	/*
	 * td click 시 모니터링 > 챔버압력 페이지로 이동
	 */
	ChamberPressure.tdOnClick = function(clickObj) {
		var btnObj = document.getElementById("realtimeButton");
		if (btnObj.className.indexOf("active") > 0) {
			setRealtime(btnObj, false);
			stopEvent();
		}
		var lineNo = clickObj.getAttribute("id").split("_")[0];
		goPage("/monitoring/chamberPressure?selectLine=" + lineNo);
	}

	/*
	 * 압력, 온도 toggle
	 */
	ChamberPressure.toggleOnClick = function(clickObj) {
		$(".on").removeClass("on");
		$(clickObj).addClass("on");
		if (toggleOnBtn != clickObj.id) {
			toggleOnBtn = clickObj.id;
			var btnObj = document.getElementById("realtimeButton");
			onToggleCalc(toggleOnBtn);
		}
	}

	/*
	 * 서버이벤트 종료
	 */
	ChamberPressure.stopEvent = function() {
		var btnObj = document.getElementById("realtimeButton");
		if (btnObj.className.indexOf("active") > 0) {
			setRealtime(btnObj, false);
			$(".blue_bg").removeClass("blue_bg");
			sse.stop();
		}
	}

	return ChamberPressure;
})(window.ChamberPressure || {}, _common, $, SSEObject);