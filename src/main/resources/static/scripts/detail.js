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

    var processingSpeed_chart = $.plot('#processingSpeed-chart', [
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

    var processingData_chart = $.plot('#processingData-chart', [
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

    var disk_chart = $.plot('#disk-chart', [
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

    function diskResourceUpdate() {
        disk_chart.setData([getRandomData()])
        disk_chart.draw()
        setTimeout(diskResourceUpdate, updateInterval)
    }

    //INITIALIZE REALTIME DATA FETCHING
    // about performance
    processingSpeedUpdate()
    processingDataUpdate()

    // about resource usage
    cpuResourceUpdate()
    memoryResourceUpdate()
    diskResourceUpdate()
})