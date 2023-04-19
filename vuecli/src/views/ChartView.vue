<template>
  <!-- pieChart -->
  <div>
    <apexchart width="880" type="donut" :options="options" :series="series"></apexchart>
  </div>
</template>
  
<script>
// @ is an alias to /src
import { ref, onMounted } from "vue";

export default {
  name: "ChartView",
  setup() {
    const options = ref({});
    const series = ref([44, 55, 41, 17, 15]);

    onMounted(async () => {
      var response = await fetch("/api/pieChart");

      if (response.ok) {
        var school_type = await response.json();
        console.log(school_type)

        series.value = school_type.map((a) => a.count);
        options.value = { labels: school_type.map((a) => a.school_type) };
      }
    });

    return {
      options,
      series,
    };
  },
};
</script>
