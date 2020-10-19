$(function () {
    /** 현재 페이지랑 선택된 페이지랑 일치하면 addClass 인데
     *  기존에는 href에 값이 있기때문에 새로운거에는
     *  url이랑 onclick param이랑 비교하면 된다
     * */
        // var url = window.location;
    var url = location.pathname;

    // for sidebar menu entirely but not cover treeview
    $('ul.nav-sidebar a').filter(function () {
        return ("/" + this.id) == url;
    }).addClass("active");

    // for treeview
    $('ul.nav-treeview a').filter(function () {
        return ("/" + this.id) == url;
    }).parentsUntil(".nav-sidebar > .nav-treeview").addClass("menu-open").prev("a").addClass("active");
})
