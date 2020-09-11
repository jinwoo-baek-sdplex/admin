// About Chart
$(function () {
    /*
     * Flot Interactive Chart
     * -----------------------
     */
    // We use an inline data source in the example, usually data would
    // be fetched from a server
    var data = [],
        totalPoints = 100

    function getRandomData() {

        if (data.length > 0) {
            data = data.slice(1)
        }

        // Do a random walk
        while (data.length < totalPoints) {

            var prev = data.length > 0 ? data[data.length - 1] : 50,
                y = prev + Math.random() * 10 - 5

            if (y < 0) {
                y = 0
            } else if (y > 100) {
                y = 100
            }

            data.push(y)
        }

        // Zip the generated y values with the x values
        var res = []
        for (var i = 0; i < data.length; ++i) {
            res.push([i, data[i]])
        }

        return res
    }

    var interactive1_plot = $.plot('#interactive1', [
            {
                data: getRandomData(),
            }
        ],
        {
            grid: {
                borderColor: '#f3f3f3',
                borderWidth: 1,
                tickColor: '#f3f3f3'
            },
            series: {
                color: '#3c8dbc',
                lines: {
                    lineWidth: 2,
                    show: true,
                    fill: true,
                },
            },
            yaxis: {
                min: 0,
                max: 100,
                show: true
            },
            xaxis: {
                show: true
            }
        }
    )
    // var interactive2_plot = $.plot('#interactive2', [
    //         {
    //             data: getRandomData(),
    //         }
    //     ],
    //     {
    //         grid: {
    //             borderColor: '#f3f3f3',
    //             borderWidth: 1,
    //             tickColor: '#f3f3f3'
    //         },
    //         series: {
    //             color: '#3c8dbc',
    //             lines: {
    //                 lineWidth: 2,
    //                 show: true,
    //                 fill: true,
    //             },
    //         },
    //         yaxis: {
    //             min: 0,
    //             max: 100,
    //             show: true
    //         },
    //         xaxis: {
    //             show: true
    //         }
    //     }
    // )
    // var interactive3_plot = $.plot('#interactive3', [
    //         {
    //             data: getRandomData(),
    //         }
    //     ],
    //     {
    //         grid: {
    //             borderColor: '#f3f3f3',
    //             borderWidth: 1,
    //             tickColor: '#f3f3f3'
    //         },
    //         series: {
    //             color: '#3c8dbc',
    //             lines: {
    //                 lineWidth: 2,
    //                 show: true,
    //                 fill: true,
    //             },
    //         },
    //         yaxis: {
    //             min: 0,
    //             max: 100,
    //             show: true
    //         },
    //         xaxis: {
    //             show: true
    //         }
    //     }
    // )

    var updateInterval = 1000 //Fetch data ever x milliseconds
    var realtime = 'on' //If == to on then fetch data every x seconds. else stop fetching
    function update() {

        interactive1_plot.setData([getRandomData()])
        // interactive2_plot.setData([getRandomData()])
        // interactive3_plot.setData([getRandomData()])

        // Since the axes don't change, we don't need to call plot.setupGrid()
        interactive1_plot.draw()
        if (realtime === 'on') {
            setTimeout(update, updateInterval)
        }
        // interactive2_plot.draw()
        // if (realtime === 'on') {
        //     setTimeout(update, updateInterval)
        // }
        // interactive3_plot.draw()
        // if (realtime === 'on') {
        //     setTimeout(update, updateInterval)
        // }
    }

    //INITIALIZE REALTIME DATA FETCHING
    if (realtime === 'on') {
        update()
    }
    //REALTIME TOGGLE
    $('#realtime .btn').click(function () {
        if ($(this).data('toggle') === 'on') {
            realtime = 'on'
        } else {
            realtime = 'off'
        }
        update()
    })
    /*
     * END INTERACTIVE CHART
     */
})



// About Log
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
