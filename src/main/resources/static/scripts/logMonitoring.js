//alert("hello.html");
var timer;

function clickedTab(tabLink) {
    var url = tabLink.getAttribute("data-url");
    var href = tabLink.hash + "-log";
    $(tabLink).tab("show");

    if (timer) {
        clearInterval(timer);
    }

    timer = setInterval(function () {
        setTabContent(url, href);
    }, 1000);
}

function setTabContent(url, href) {
    $.get(url, function (result) {
        $(href).append(result + "<br/>");
        $(href).scrollTop($(href).prop('scrollHeight'));
    });
}

function startLog(tab) {
    timer = setInterval(function () {
        setTabContent("/sample/" + tab, "#" + tab + "-log");
    }, 1000);
}

function stopLog() {
    clearInterval(timer);
}

var layerTimer = {};

function openLogLayer(tab) {
    var layer = $("#" + tab + "-layer");
    layer.draggable({handle: ".modal-header"});
    layer.modal({backdrop: false});

    layerTimer[tab] = setInterval(function () {
        setTabContent("/sample/" + tab, "#" + tab + "-layer-log");
    }, 1000);

    $("#" + tab + "-resizable").resizable({
        helper: "ui-resizable-helper",
        maxHeight: 600,
        maxWidth: 800,
        minHeight: 200,
        minWidth: 400,
        stop: function (e, ui) {
            ui.element[0].children[1].children[0].style.height = (ui.size.height - 105) + "px";
        }
    });
}

function closeLayer(tab) {
    clearInterval(layerTimer[tab]);
    $("#" + tab + "-layer").modal("hide");
}

function startLayerLog(tab) {
    layerTimer[tab] = setInterval(function () {
        setTabContent("/sample/" + tab, "#" + tab + "-layer-log");
    }, 1000);
}

function stopLayerLog(tab) {
    clearInterval(layerTimer[tab]);
}

$(document).ready(function () {
    timer = setInterval(function () {
        setTabContent("/sample/tab1", "#tab1-log");
    }, 1000);
});