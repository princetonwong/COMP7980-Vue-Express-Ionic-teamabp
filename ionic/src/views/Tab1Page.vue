<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>
          <ion-text color="success">Secondary School Profiles</ion-text>
        </ion-title>
        <ion-title>HomePage</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Tab 1</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-list>
        <ion-card color="secondary">
          <ion-card-header>
            <ion-card-title>District</ion-card-title>
          </ion-card-header>
        </ion-card>
        <ion-item>
          <ion-select placeholder="Select district" v-model="district">
            <ion-select-option value="Kowloon City">Kowloon City</ion-select-option>
            <ion-select-option value="Yau Tsim  Mong">Yau Tsim Mong</ion-select-option>
            <ion-select-option value="Kwai Tsing">Kwai Tsing</ion-select-option>
            <ion-select-option value="Tuen Mun">Tuen Mun</ion-select-option>
            <ion-select-option value="Wong Tai Sin">Wong Tai Sin</ion-select-option>
            <ion-select-option value="Sha Tin">Sha Tin</ion-select-option>
            <ion-select-option value="Sai Kung">Sai Kung</ion-select-option>
            <ion-select-option value="Tsuen Wan">Tsuen Wan</ion-select-option>
            <ion-select-option value="Islands">Islands</ion-select-option>
            <ion-select-option value="North">North</ion-select-option>
            <ion-select-option value="Sham Shui Po">Sham Shui Po</ion-select-option>
            <ion-select-option value="Eastern">Eastern</ion-select-option>
            <ion-select-option value="Wan Chai">Wan Chai</ion-select-option>
            <ion-select-option value="Yuen Long">Yuen Long</ion-select-option>
            <ion-select-option value="Southern">Southern</ion-select-option>
            <ion-select-option value="Central & Western">Central & Western</ion-select-option>
            <ion-select-option value="Kwun Tong">Kwun Tong</ion-select-option>
            <ion-select-option value="Tai Po">Tai Po</ion-select-option>
          </ion-select>
        </ion-item>
      </ion-list>
      <ion-list>
        <ion-card color="secondary">
          <ion-card-header>
            <ion-card-title>School Type</ion-card-title>
          </ion-card-header>
        </ion-card>
        <ion-item>
          <ion-select placeholder="Select school type" v-model="school_type">
            <ion-select-option value="Gov't">Gov't</ion-select-option>
            <ion-select-option value="Aided">Aided</ion-select-option>
            <ion-select-option value="DSS">DSS</ion-select-option>
            <ion-select-option value="CAPUT">CAPUT</ion-select-option>
          </ion-select>
        </ion-item>
      </ion-list>
      <ion-card color="secondary">
        <ion-card-header>
          <ion-card-title>School Name</ion-card-title>
        </ion-card-header>
      </ion-card>
      <ion-searchbar show-clear-button="always" placeholder="School name" v-model="school_name"></ion-searchbar>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button fill="solid" @click="submitForm()" size="large">
            Search
          </ion-button>
          <ion-button href="/tabs/tab2" fill="solid" size="large">
            Advanced Search
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
      <ion-card v-for="result in results" :key="result._id">
        <ion-card-header>
          <ion-card-title> {{ result.school_name }} </ion-card-title>
        </ion-card-header>
      </ion-card>
      <ExploreContainer name="Tab 1 page" />
    </ion-content>
  </ion-page>

</template>

<script>
import { ref, computed, defineComponent } from 'vue';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonList, IonSelect, IonSelectOption, IonSearchbar,
  IonButton, IonButtons
} from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';
import { trashBin } from 'ionicons/icons';
import { useRouter } from "vue-router"

export default defineComponent({
  name: 'Tab1Page',
  components: {
    ExploreContainer, IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonItem, IonList, IonSelect, IonSelectOption
    , IonSearchbar, IonButton, IonButtons
  },

  setup() {
    // const route = useRoute();
    const router = useRouter();
    const district = ref("");
    const school_type = ref("");
    const school_name = ref("");
    const formSubmitted = ref(false);
    const formSearch = ref(false);
    const results = ref([]);
    const lastPage = ref(0);
    const advancedsearch = () => {
      router.push({ name: "advancedsearch" })
    }

    const pages = computed(() => {
      var pages = [];

      for (var i = 1; i <= lastPage.value; i++) {
        pages.push(i)
      }

      return pages;
    })

    const submitForm = async (page) => {
      if (!page) page = 1
      console.log('submit')
      formSubmitted.value = true

      var query_string = "/api/search?page=" + page
      if (district.value) query_string += "&district=" + district.value
      if (school_type.value) query_string += "&school_type=" + school_type.value
      if (school_name.value) query_string += "&school_name=" + school_name.value

      var response = await fetch(query_string);

      if (response.ok) {
        var response_json = await response.json();
        results.value = response_json.schools
        formSearch.value = true
        lastPage.value = response_json.pages
      } else {
        alert(response.statusText)
      }
    };

    return {
      submitForm,
      formSubmitted,
      district,
      school_type,
      school_name,
      formSearch,
      results,
      advancedsearch,
      pages,
    };
  }

});




</script>
