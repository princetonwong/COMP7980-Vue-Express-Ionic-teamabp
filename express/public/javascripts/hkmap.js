// Example usage: /public/amcharts-hkmap.html

document.addEventListener("DOMContentLoaded", async function () {
    //Setup root
    var root = am5.Root.new("chartdiv_hk");

    // Fetch data from API
    var response = await fetch("/api/distinct/district")
    if (response.ok) {
        data = await response.json();
    } else {
        alert(response.statusText)
    }

    // Transform data to am5 format
    const districtDict = {
        "Yau Tsim  Mong": "HK-YT",
        "Yuen Long": "HK-YL",
        "Wong Tai Sin": "HK-WT",
        "Wan Chai": "HK-WC",
        "Tsuen Wan": "HK-TW",
        "Tai Po": "HK-TP",
        "Tuen Mun": "HK-TM",
        "Sha Tin": "HK-ST",
        "Sham Shui Po": "HK-SS",
        "Southern": "HK-SO",
        "Sai Kung": "HK-SK",
        "North": "HK-NO",
        "Kwun Tong": "HK-KU",
        "Kwai Tsing": "HK-KI",
        "Kowloon City": "HK-KC",
        "Islands": "HK-IS",
        "Eastern": "HK-EA",
        "Central & Western": "HK-CW",
    }

    transformedData = data.map(data => {
        return {
            id: districtDict[data._id],
            value: data.count || 0,
            url: "/api/distinct/district/"
        }
    })

    // Init chart and polygonSeries
    var chart = root.container.children.push(
        am5map.MapChart.new(root, { wheelY: "none" })
    );

    var polygonSeries = chart.series.push(
        am5map.MapPolygonSeries.new(root, {
            geoJSON: am5geodata_hongKongHigh,
            valueField: "value",
            calculateAggregates: true
        })
    );

    // Title
    var title = chart.children.push(am5.Label.new(root, {
        text: "Number of schools \n in Hong Kong (by district)",
        fontSize: 20,
        y: 20,
        x: am5.percent(20),
        centerX: am5.p50,
        background: am5.Rectangle.new(root, {
            fill: am5.color(0xffffff),
            fillOpacity: 0.5
        })
    }));

    // Set data
    polygonSeries.data.setAll(transformedData);


    // Set hover and tooltipHTML
    // allow link to "/district/{name}"
    var style = document.createElement('style');
    document.head.appendChild(style);
    style.sheet.insertRule(`
    #maphoverrr {
        color: white;
        font-family: Arial, Helvetica, sans-serif;
    }`)
    style.sheet.insertRule(`a {
        color: white;
        font-family: Arial, Helvetica, sans-serif;
    }`)

    polygonSeries.mapPolygons.template.setAll({
        tooltipHTML: '<div id="maphoverrr"><b>{name}</b><br><a href="/district/{name}">More info</a></div>',
    });

    polygonSeries.set("heatRules", [{
        target: polygonSeries.mapPolygons.template,
        dataField: "value",
        min: am5.color(0xf6cb1c),
        max: am5.color(0x62510b),
        key: "fill"
    }]);

    polygonSeries.mapPolygons.template.states.create("hover", {
        fill: root.interfaceColors.get("primaryButtonHover")
    });

})

