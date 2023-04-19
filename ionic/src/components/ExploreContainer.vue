<template>
  <div id="container">
    <strong>{{ name }}</strong>
    <p>E<a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components">U</a></p>
  </div>
  <ion-card v-for="result in results" :key="result._id">
    <ion-card-header>
      <ion-card-title> {{ result.school_name }} </ion-card-title>
    </ion-card-header>
  </ion-card>
</template>

<script>
import { defineComponent, ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { IonCard, IonCardHeader, IonCardTitle } from '@ionic/vue';

export default defineComponent({
  name: 'ExploreContainer',
  props: {
    name: String
  },
  components: { IonCard, IonCardHeader, IonCardTitle },
  setup(props) {
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

<style scoped>
#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 100%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  color: #fca0d0;
  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>
