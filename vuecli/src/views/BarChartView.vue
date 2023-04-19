<template>
    <div>
        <apexchart type="bar" :options="options" :series="series"></apexchart>
    </div>
    <label class="col-sm-2 col-form-label">Sort by</label>
    <select class="form-select" v-model="school_type" @change="updateChart()">
        <option selected name="school_type" value="Aided">Aided</option>
        <option value="DSS">DSS</option>
        <option value="Gov't">Government</option>
        <option value="CAPUT">CAPUT</option>
    </select>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
    name: 'BarChartView',
    setup() {
        const options = ref({});
        const series = ref([]);
        const school_type = ref("Aided");
        const groups = ref([])

        onMounted(async () => {
            var response = await fetch("/api/district_school_type_group")

            if (response.ok) {
                groups.value = await response.json();
                console.log(groups.value)
                updateChart()
            } else {
                alert(response.statusText)
            }
        });

        var districts = ["Kowloon City", "Yau Tsim  Mong", "Kwai Tsing", "Tuen Mun",
            "Wong Tai Sin", "Sha Tin", "Sai Kung", "Tsuen Wan", "Islands", "North",
            "Sham Shui Po", "Eastern", "Wan Chai", "Yuen Long", "Southern", "Central & Western", "Kwun Tong", "Tai Po"]
        var schoolTypes = ["DSS", "Aided", "Gov't", "CAPUT"]

        var barChartSortOrder = schoolTypes
        var chartColorOrder = ['#FB2A4E', '#FCA116', '#1DE184', "#0E78FA"]

        const updateChart = () => {
            var datas = {}
            schoolTypes.forEach(st => datas[st] = {})
            var districtSeries = []

            let index = barChartSortOrder.indexOf(school_type.value)
            barChartSortOrder.unshift(barChartSortOrder.splice(index, 1)[0]);
            chartColorOrder.unshift(chartColorOrder.splice(index, 1)[0]);

            for (const d of districts) {
                var filteredGroups = groups.value.filter(g => g.school_type == [school_type.value])
                var mapped = filteredGroups.map(ag => ag.district)
                datas[school_type.value][d] = (mapped.includes(d)) ? filteredGroups.find(dd => dd.district === d).count : 0
            }

            datas[school_type.value] = Object.fromEntries(
                Object.entries(datas[school_type.value]).sort(([, a], [, b]) => b - a)
            )

            districtSeries = Object.keys(datas[school_type.value])

            for (const d of districtSeries) {
                var otherSchoolTypes = schoolTypes.filter(a => a != school_type.value)
                for (const ost of otherSchoolTypes) {
                    filteredGroups = groups.value.filter(g => g.school_type == [ost])
                    mapped = filteredGroups.map(ag => ag.district)
                    datas[ost][d] = (mapped.includes(d)) ? filteredGroups.find(dd => dd.district === d).count : 0
                }
            }

            console.log(datas)
            console.log(districtSeries)

            options.value = {
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
                xaxis: {
                    categories: districtSeries,
                },
                colors: chartColorOrder,
                title: {
                    text: 'Number of schools for each school type in each district',
                },
                noData: {
                    text: 'Loading...'
                }
            }

            // console.log(options.value)

            series.value = [
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
            ];

            // console.log(series.value)
        }

        return {
            options,
            series,
            school_type,
            updateChart
        };
    }
}
</script>
<style>
form {
    padding: 10px;
    border: 2px solid black;
    border-radius: 5px;
}

input {
    padding: 4px 8px;
    margin: 4px;
}

span {
    font-size: 18px;
    margin: 4px;
    font-weight: 500;
}

.submit {
    font-size: 15px;
    color: #fff;
    background: rgb(5, 109, 31);
    padding: 6px 12px;
    border: none;
    margin-top: 8px;
    cursor: pointer;
    border-radius: 5px;
}

ul {
    flex-wrap: wrap;
}

table {
    margin: 0 auto;
}

nav {
    margin: 0 auto;
}
</style>