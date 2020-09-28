// About Chart

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

var processingSpeed_chart = $.plot('#chart1', [
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

var processingData_chart = $.plot('#chart2', [
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
            color: '#BA55D3',
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

// var baseOnChart2 =
var memory_chart = $.plot('#chart3', [
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
            color: '#7CFC00',
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

var updateInterval = 1000 //Fetch data ever x milliseconds

function processingSpeedUpdate() {
    processingSpeed_chart.setData([getRandomData()])
    processingSpeed_chart.draw()
    setTimeout(processingSpeedUpdate, updateInterval)
}

function processingDataUpdate() {
    processingData_chart.setData([getRandomData()])
    processingData_chart.draw()
    setTimeout(processingDataUpdate, updateInterval)
}

function memoryResourceUpdate() {
    memory_chart.setData([getRandomData()])
    memory_chart.draw()
    setTimeout(memoryResourceUpdate, updateInterval)
}

// // about performance
processingSpeedUpdate()
processingDataUpdate()
memoryResourceUpdate()


function labelFormatter(label, series) {
    return '<div style="font-size:13px; text-align:center; padding:2px; color: #fff; font-weight: 600;">'
        + label
        + '<br>'
        + Math.round(series.percent) + '%</div>'
}

function changeChart(linkToggle) {
    var href = linkToggle.hash;
    var strArray = href.split('-');
    var drawArea =  strArray[0];
    var chart = strArray[1];

    // for disk chart
    var donutData = [
        {
            label: 'Usage',
            data: 30,
            color: '#3c8dbc'
        },
        {
            label: 'Empty',
            data: 70,
            color: '#00c0ef'
        }
    ]
    var seriesSet = {
        series: {
            pie: {
                show: true,
                radius: 1,
                innerRadius: 0.5,
                label: {
                    show: true,
                    radius: 2 / 3,
                    formatter: labelFormatter,
                    threshold: 0.1
                }

            }
        },
        legend: {
            show: false
        }
    }


    // alert(chart);
    alert(drawArea);

    if (drawArea == "#chart1") {

        switch (chart) {
            case "disk":
                $(drawArea).empty();
                $.plot(drawArea, donutData, seriesSet);
                break;
            case "processingSpeed":
                $(drawArea).empty();
                processingSpeedUpdate();

        }

    }






    // var newChart = $(chart).parents("chart1").find(".drop").attr('id', chart).getAttribute("id");
    //
    // alert(newChart);
    // $(newChart).empty();

    // if (chart == "#disk-chart") {
    //     $(chart).empty();
    // }
    // else {
    //     $("#processingData-chart").empty();
    //     var processingData_chart = $.plot('#processingData-chart', [
    //             {
    //                 data: getRandomData(),
    //             }
    //         ],
    //         {
    //             grid: {
    //                 borderColor: '#f3f3f3',
    //                 borderWidth: 1,
    //                 tickColor: '#f3f3f3'
    //             },
    //             series: {
    //                 color: '#3c8dbc',
    //                 lines: {
    //                     lineWidth: 2,
    //                     show: true,
    //                     fill: true,
    //                 },
    //             },
    //             yaxis: {
    //                 min: 0,
    //                 max: 100,
    //                 show: true
    //             },
    //             xaxis: {
    //                 show: true
    //             }
    //         }
    //     )
    //     processingDataUpdate()
    // }
}

