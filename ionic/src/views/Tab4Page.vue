<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>
                    <ion-text color="success">Secondary School Profiles</ion-text>
                </ion-title>
                <ion-title>Pie Chart</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <ion-header collapse="condense">
                <ion-toolbar>
                    <ion-title size="large">Pie Chart</ion-title>
                </ion-toolbar>
            </ion-header>
            <apexchart width="880" type="donut" :options="options" :series="series"></apexchart>
            <ExploreContainer name="Tab 4 page" />
        </ion-content>
    </ion-page>
</template>
    
<script>
// @ is an alias to /src
import { defineComponent, ref, onMounted } from "vue";
import {
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent
} from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';
import VueApexCharts from "vue3-apexcharts";

export default defineComponent({
    name: 'Tab4Page',
    components: {
        ExploreContainer, IonHeader, IonToolbar, IonTitle, IonContent, apexchart: VueApexCharts
    },


    setup() {
        const options = ref({});
        const series = ref([356, 58, 30, 2]);

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
});
</script>