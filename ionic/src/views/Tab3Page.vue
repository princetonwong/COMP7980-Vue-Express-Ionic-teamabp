<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>
          <ion-text color="success">Secondary School Profiles</ion-text>
        </ion-title>
        <ion-title>Map</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Tab 3</ion-title>
        </ion-toolbar>
      </ion-header>

      <ExploreContainer name="Tab 3 page" />
    </ion-content>
  </ion-page>

  <div id="chartdiv_hk"></div>
</template>

<script>
import { onMounted } from "vue";
import * as am5 from '@amcharts/amcharts5';
import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_hongKongHigh from "@amcharts/amcharts5-geodata/hongKongHigh";

export default {
  name: 'MapView',
  setup() {
    onMounted(async () => {
      //Setup root
      var root = am5.Root.new("chartdiv_hk");

      // Fetch data from API
      var response = await fetch("/api/distinct/district")
      if (response.ok) {
        var data = await response.json();
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

      var transformedData = data.map(data => {
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
      console.log(title)

      // Set data
      polygonSeries.data.setAll(transformedData);

      // Set hover and tooltipHTML
      // allow link to "/district/{name}"
      var style = document.createElement('style');
      document.head.appendChild(style);
      style.sheet.insertRule(
        `#maphoverrr {
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
  }
}
</script>

<style scoped>
#chartdiv_hk {
  width: 100vw;
  height: 100vh;
  background-color: AliceBlue
}
</style>
