<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>
          <ion-text color="success">Secondary School Profiles</ion-text>
        </ion-title>
        <ion-title>Advanced Search</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Tab 2</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-card color="secondary">
        <ion-card-header>
          <ion-card-title>School Name</ion-card-title>
        </ion-card-header>
      </ion-card>
      <ion-searchbar show-clear-button="always" placeholder="School name"></ion-searchbar>
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
      <ion-list>
        <ion-card color="secondary">
        <ion-card-header>
          <ion-card-title>Gender</ion-card-title>
        </ion-card-header>
        </ion-card>
        <ion-item>
          <ion-select placeholder="Select gender" v-model="student_gender">
            <ion-select-option value="Boys">Boys</ion-select-option>
            <ion-select-option value="Girls">Girls</ion-select-option>
            <ion-select-option value="Co-ed">Co-ed</ion-select-option>
          </ion-select>
        </ion-item>
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
        <ion-card color="secondary">
          <ion-card-header>
            <ion-card-title>Religion</ion-card-title>
          </ion-card-header>
        </ion-card>
        <ion-item>
          <ion-select placeholder="Select religion" v-model="religion">
            <option value="">Please select the religion</option>
                <ion-select-option value="Christianity">Protestantism / Christianity</ion-select-option>
                <ion-select-option value="Catholicism">Catholicism</ion-select-option>
                <ion-select-option value="Buddhism">Buddhism</ion-select-option>
                <ion-select-option valuee="Taoism">Taoism</ion-select-option>
                <ion-select-option value="Confucianism">Confucianism  </ion-select-option>
                <ion-select-option value="Islam">Islam</ion-select-option>
                <ion-select-option value="Others">Others</ion-select-option>
                <ion-select-option value="Not Applicable">Not Applicable</ion-select-option>
          </ion-select>
        </ion-item>
      </ion-list>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button fill="outline">
            Search
          </ion-button>
        </ion-buttons>
      </ion-toolbar>  

      <ExploreContainer name="Tab 2 page" />
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from 'vue';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonList, IonSelect, IonSelectOption, IonSearchbar,
  IonButton, IonButtons
} from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';
import { trashBin } from 'ionicons/icons';

export default defineComponent({
  name: 'Tab2Page',
  components: {
    ExploreContainer, IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonList, IonSelect, IonSelectOption, IonSearchbar,
    IonButton, IonButtons
  }
});
</script>
