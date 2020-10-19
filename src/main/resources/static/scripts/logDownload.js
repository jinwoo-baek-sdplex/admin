


$(document).ready(function () {
    /*
    * 검색 조건 Log Domain에 따른 Protocol Module disable 여부
    * */
    $("input[type=radio][name=logSearchRadio]").change(function () {
        var chkValue = $("input[type=radio][name=logSearchRadio]:checked").val();

        if(chkValue == "0") {
            $("#pmSelect").prop("disabled", true);

        } else {
            $("#pmSelect").prop("disabled", false);
        }
    })
})


/*
* 다운로드 리스트 출력
* */
// 여기 표현식으로 클래스 작성
// var getDownloadList = $
$(function () {
    $('input[name="pickerTest"]').daterangepicker();
});
