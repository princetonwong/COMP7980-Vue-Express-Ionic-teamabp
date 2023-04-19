<template>
    <div>
        <h2>Advanced Search</h2>
    </div>
    <form @submit.prevent="submitForm(1)">
        <div class="form-group">
            <label for="schoolName">School Name</label>
            <input v-model="school_name" type="text" class="form-control" id="schoolName"
                placeholder="Enter school name">
        </div>
        <div class="form-group">
            <label for="district">District</label>
            <select v-model="district" class="form-control" id="district">
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
        <div class="form-group">
            <label for="student_gender">Gender</label>
            <select v-model="student_gender" class="form-control" id="student_gender">
                <option value="">Please select the gender</option>
                <option value="Boys">Boys</option>
                <option value="Girls">Girls</option>
                <option value="Co-ed">Co-ed</option>
            </select>
        </div>
        <div class="form-group">
            <label for="school_type">School Type</label>
            <select v-model="school_type" class="form-control" id="school_type">
                <option value="">Please select one school type</option>
                <option value="Gov't">Gov't</option>
                <option value="Aided">Aided</option>
                <option value="DSS">DSS</option>
                <option value="CAPUT">CAPUT</option>
            </select>
        </div>
        <div class="form-group">
            <label for="religion">Religion</label>
            <select v-model="religion" class="form-control" id="religion">
                <option value="">Please select the religion</option>
                <option value="Christianity">Protestantism / Christianity</option>
                <option value="Catholicism">Catholicism</option>
                <option value="Buddhism">Buddhism</option>
                <option value="Taoism">Taoism</option>
                <option value="Confucianism">Confucianism</option>
                <option value="Islam">Islam</option>
                <option value="Others">Others</option>
                <option value="Not Applicable">Not Applicable</option>
            </select>
        </div>
        <button type="submit" class="btn btn-primary">Search</button>
    </form>

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
                            <th scope="col">Religion</th>
                            <th scope="col">Gender</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="result in results" :key="result._id">
                            <td>{{ result.district }}</td>
                            <td>{{ result.school_type }}</td>
                            <td>{{ result.school_name }}</td>
                            <td>{{ result.religion }}</td>
                            <td>{{ result.student_gender }}</td>
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

export default {
    name: 'AdvancedSearchView',
    setup() {
        // const route = useRoute();
        const district = ref("");
        const school_type = ref("");
        const school_name = ref("");
        const student_gender = ref("");
        const religion = ref("");
        const formSubmitted = ref(false);
        const formSearch = ref(false);
        const results = ref([]);
        const lastPage = ref(0);

        const pages = computed(() => {
            var pages = [];

            for (var i = 1; i <= lastPage.value; i++) {
                pages.push(i)
            }

            return pages;
        })


        const submitForm = async (page) => {
            console.log('submit')
            formSubmitted.value = true

            var query_string = "/api/search?page=" + (page || '1')
            if (district.value) query_string += "&district=" + district.value
            if (school_type.value) query_string += "&school_type=" + school_type.value
            if (school_name.value) query_string += "&school_name=" + school_name.value
            if (religion.value) query_string += "&religion=" + religion.value
            if (student_gender.value) query_string += "&student_gender=" + student_gender.value


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
            student_gender,
            religion,
            formSearch,
            results,
            pages,
        };
    }
}
</script>
<style>
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

