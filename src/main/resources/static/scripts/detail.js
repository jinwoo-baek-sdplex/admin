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

    var cpu_chart = $.plot('#cpu-chart', [
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

    var memory_chart = $.plot('#memory-chart', [
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

    var updateInterval = 1000 //Fetch data ever x milliseconds

    function cpuResourceUpdate() {
        cpu_chart.setData([getRandomData()])
        cpu_chart.draw()
        setTimeout(cpuResourceUpdate, updateInterval)
    }

    function memoryResourceUpdate() {
        memory_chart.setData([getRandomData()])
        memory_chart.draw()
        setTimeout(memoryResourceUpdate, updateInterval)
    }


    // //INITIALIZE REALTIME DATA FETCHING
    // // about performance
    // processingSpeedUpdate()
    // processingDataUpdate()

    // about resource usage
    cpuResourceUpdate()
    memoryResourceUpdate()


    /*
     * DONUT CHART
     * -----------
     */

    var donutData = [
        {
            label: 'Usage',
            data : 30,
            color: '#3c8dbc'
        },
        {
            label: 'Empty',
            data : 70,
            color: '#00c0ef'
        }
    ]
    $.plot('#donut-chart', donutData, {
        series: {
            pie: {
                show       : true,
                radius     : 1,
                innerRadius: 0.5,
                label      : {
                    show     : true,
                    radius   : 2 / 3,
                    formatter: labelFormatter,
                    threshold: 0.1
                }

            }
        },
        legend: {
            show: false
        }
    })
    /*
     * END DONUT CHART
     */
})


/*
 * Custom Label formatter
 * ----------------------
 */
function labelFormatter(label, series) {
    return '<div style="font-size:13px; text-align:center; padding:2px; color: #fff; font-weight: 600;">'
        + label
        + '<br>'
        + Math.round(series.percent) + '%</div>'
}

function clickedToggle(toggle) {
    $("#chart2").load(window.location.href+"#chart3");
}