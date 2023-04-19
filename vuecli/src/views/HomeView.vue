<template>
  <div class="container my-4">
    <img class="col-12 col-sm-6" style="float: center;" src="https://www.education-ladder.com/ckfinder/userfiles/images/20141121005544.jpg">
  </div>

  <div class="app">
    <form @submit.prevent="submitForm(1)">
      <div class="row">
        <div class="col">District:
          <select class="form-control" v-model="district">
            <option value="">Please select one district</option>
            <option value="Kowloon City">Kowloon City</option>
            <option value="Yau Tsim  Mong">Yau Tsim Mong</option>
            <option value="Kwai Tsing">Kwai Tsing</option>
            <option value="Tuen Mun">Tuen Mun</option>
            <option value="Wong Tai Sin">Wong Tai Sin</option>
            <option value="Sha Tin">Sha Tin</option>
            <option value="Sai Kung">Sai Kung</option>
            <option value="Tsuen Wan">Tsuen Wan</option>
            <option value="Islands">Islands</option>
            <option value="North">North</option>
            <option value="Sham Shui Po">Sham Shui Po</option>
            <option value="Eastern">Eastern</option>
            <option value="Wan Chai">Wan Chai</option>
            <option value="Yuen Long">Yuen Long</option>
            <option value="Southern">Southern</option>
            <option value="Central & Western">Central & Western</option>
            <option value="Kwun Tong">Kwun Tong</option>
            <option value="Tai Po">Tai Po</option>
          </select>
        </div>
        <div class="col">School Type:
          <select class="form-control" v-model="school_type">
            <option value="">Please select one school type</option>
            <option value="Gov't">Gov't</option>
            <option value="Aided">Aided</option>
            <option value="DSS">DSS</option>
            <option value="CAPUT">CAPUT</option>
          </select>
        </div>
        <div class="col">School Name:
          <input class="form-control" v-model="school_name" placeholder="School Name" />
          <!-- <router-link to="/"><button @click="submitForm" class="btn btn-primary">Search</button></router-link> -->
        </div>
        <div class="row mt-2 justify-content-center">
          <button class="col-2 btn btn-primary me-3">Search</button>
          <button @click="advancedsearch" class="col-2 btn btn-success">Advanced Search</button>
        </div>
      </div>
    </form>
  </div>

  <!-- <div>
    <img src="https://www.education-ladder.com/ckfinder/userfiles/images/20141121005544.jpg" v-if=!imgschool" alt="seconday school" width="32" height="32" >
  </div> -->

  <!-- Result List -->
  <div v-if="formSearch" class="mt-3">
    <h1>Search Result</h1>
    <div class="row">
      <div class="col-2"></div>
      <div class="col-8">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">District</th>
              <th scope="col">School Type</th>
              <th scope="col">School Name</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="result in results" :key="result._id">
              <td>{{ result.district }}</td>
              <td>{{ result.school_type }}</td>
              <td>{{ result.school_name }}</td>
            </tr>
          </tbody>
        </table>
        <nav aria-label="Page navigation example">
          <ul class="pagination">
            <li class="page-item" v-for="i in pages" :key="i" @click="submitForm(i)">
              <a class="page-link">
                {{ i }}
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div class="col-2"></div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue"
import { useRouter } from "vue-router"

export default {
  name: 'HomeView',
  setup() {
    // const route = useRoute();
    const router = useRouter();
    const district = ref("");
    const school_type = ref("");
    const school_name = ref("");
    const formSubmitted = ref(false);
    // const imgschool = ref(false);
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
      // imgschool,
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

