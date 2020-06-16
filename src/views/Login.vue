<template>
    <div class="min-h-screen flex pt-20 justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full">
            <div>
                <h2 class="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
                    Sign in to your account
                </h2>
            </div>

            <div v-if="errorMsg" class="bg-red-100 border border-red-400 text-red-700 mt-4 px-4 py-3 rounded relative" role="alert">
                <span class="block sm:inline">{{errorMsg}}</span>
            </div>

            <form class="mt-8" @submit.prevent="submit">

                <div class="rounded-md shadow-sm">
                    <div>
                        <input v-model="form.email" aria-label="Email address" name="email" type="email" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5" placeholder="Email address" />
                    </div>
                    <div class="-mt-px">
                        <input v-model="form.password" aria-label="Password" name="password" type="password" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5" placeholder="Password" />
                    </div>
                </div>

                <div class="mt-6">
                    <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
                        Sign in
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>

    import {mapActions} from "vuex";
    import axios from 'axios';

    axios.defaults.baseURL = 'http://127.0.0.1:8000/';
    axios.defaults.withCredentials = true;

    export default {

        name: "Login",

        data () {
            return {
                form: {
                    email: '',
                    password: '',
                },
                errorMsg: '',
            }
        },

        methods: {

            ...mapActions({
                check: 'auth/check'
            }),

             submit () {

                 axios.get('/sanctum/csrf-cookie').then(() => {
                     axios.post('/api/login', this.form).then(response => {
                         if(response.data.status === 1){
                             this.check()
                             this.$router.replace({ name: 'Home' })
                         }else{
                             this.errorMsg = response.data.message
                         }
                     })
                })

            },

        }

    }
</script>

<style scoped>

</style>