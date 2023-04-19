// Example usage: /public/apexchart-example.html

const fetchGroups = async () => {
    var response = await fetch("/api/district_school_type_group")

    if (response.ok) {
        var data = await response.json();
        return data
    } else {
        alert(response.statusText)
    }
}

// Init varaibles
var groups = {}
var districts = ["Kowloon City", "Yau Tsim  Mong", "Kwai Tsing", "Tuen Mun",
    "Wong Tai Sin", "Sha Tin", "Sai Kung", "Tsuen Wan", "Islands", "North",
    "Sham Shui Po", "Eastern", "Wan Chai", "Yuen Long", "Southern", "Central & Western", "Kwun Tong", "Tai Po"]
var schoolTypes = ["DSS", "Aided", "Gov't", "CAPUT"]
var districtSeries = []

var barChartSortOrder = schoolTypes
var chartColorOrder = ['#FB2A4E', '#FCA116', '#1DE184', "#0E78FA"]

var chartOptions = {
    chart: {
        type: 'bar',
        stacked: true,
        height: 600
    },
    plotOptions: {
        bar: {
            horizontal: false,
            dataLabels: {
                position: 'top',
            },
        }
    },
    dataLabels: {
        enabled: true,
        offsetX: -6,
        style: {
            fontSize: '12px',
            colors: ['#fff']
        }
    },
    stroke: {
        show: true,
        width: 1,
        colors: ['#fff']
    },
    tooltip: {
        shared: true,
        intersect: false
    },
    colors: chartColorOrder,
    series: [],
    title: {
        text: 'Number of schools for each school type in each district',
    },
    noData: {
        text: 'Loading...'
    }
}

var chart = new ApexCharts(document.querySelector("#chart"), chartOptions);

// Trigger change of sorting value
const sortChanged = (schoolType) => {
    schoolTypes.forEach(st => datas[st] = {})
    districtSeries = []

    let index = barChartSortOrder.indexOf(schoolType)
    barChartSortOrder.unshift(barChartSortOrder.splice(index, 1)[0]);
    chartColorOrder.unshift(chartColorOrder.splice(index, 1)[0]);
    // barChartSortOrder.sort((x, y) => (x == schoolType) ? -1 : ((y == schoolType) ? 1 : 0));


    for (const d of districts) {
        filteredGroups = groups.filter(g => g.school_type == [schoolType])
        var mapped = filteredGroups.map(ag => ag.district)
        datas[schoolType][d] = (mapped.includes(d)) ? filteredGroups.find(dd => dd.district === d).count : 0
    }

    datas[schoolType] = Object.fromEntries(
        Object.entries(datas[schoolType]).sort(([, a], [, b]) => b - a)
    )

    districtSeries = Object.keys(datas[schoolType])

    for (const d of districtSeries) {
        otherSchoolTypes = schoolTypes.filter(a => a != schoolType)
        for (const ost of otherSchoolTypes) {
            filteredGroups = groups.filter(g => g.school_type == [ost])
            var mapped = filteredGroups.map(ag => ag.district)
            datas[ost][d] = (mapped.includes(d)) ? filteredGroups.find(dd => dd.district === d).count : 0
        }
    }
    console.log(datas)
    console.log(districtSeries)

    chart.updateOptions({
        xaxis: {
            categories: districtSeries,
        },
        series: [
            {  
                name: barChartSortOrder[0],
                data: Object.values(datas[barChartSortOrder[0]])
            }, {
                name: barChartSortOrder[1],
                data: Object.values(datas[barChartSortOrder[1]])
            }, {
                name: barChartSortOrder[2],
                data: Object.values(datas[barChartSortOrder[2]])
            }, {
                name: barChartSortOrder[3],
                data: Object.values(datas[barChartSortOrder[3]])
            }
        ],
        colors: chartColorOrder,
    })
}

const initChart = async () => {
    groups = await fetchGroups()

    chart.render();

    // Init empty datas with schooltype as keys
    datas = {}
    schoolTypes.forEach(st => datas[st] = {})

    sortChanged("Aided")
}

initChart()