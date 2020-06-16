<template>
  <div class="relative bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <div class="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
        <div class="lg:w-0 lg:flex-1">
          <a href="#" class="text-xl leading-6 font-medium text-gray-700 focus:outline-none focus:text-gray-900 transition ease-in-out duration-150">{{user.name}}</a>
        </div>
        <div class="-mr-2 -my-2 md:hidden">
          <button type="button" class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
        </div>
        <div class="hidden md:flex items-center justify-end space-x-8 md:flex-1 lg:w-0">
          <span class="inline-flex rounded-md shadow-sm">
          <button @click="logout" class="whitespace-no-wrap inline-flex items-center justify-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-red-600 hover:bg-red-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150">Logout</button>
        </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import {mapActions} from "vuex";
  import axios from 'axios';

  axios.defaults.baseURL = 'http://127.0.0.1:8000/';
  axios.defaults.withCredentials = true;

export default {
  name: 'Home',

  data() {
    return {
      user: [],
    }
  },

  created() {
    this.me();
  },

  methods: {

    ...mapActions({
      check: 'auth/check'
    }),

    me(){
      axios.get('/api/user').then(response => {
        this.user = response.data
      })
    },

    logout() {
      axios.get('/api/logout').then(() => {
        this.check()
        this.$router.replace({ name: 'Login' })
      })
    }

  }
  
}
</script>

<style scoped>

</style>
