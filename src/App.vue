<template>
    <div id="app">
        <router-view name="header"></router-view>
        <main class="mainCon">
            <fade-transition origin="center" mode="out-in" :duration="250">
                <router-view/>
            </fade-transition>
        </main>
        <!-- <router-view name="footer"></router-view> -->
    </div>
</template>
<script>
import { FadeTransition } from "vue2-transitions";

export default {
  components: {
    FadeTransition
  }
};
</script>
<style>
    html,body{
        width: 100%;
        height: 100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(150deg, #cbaabc 15%, #856ed5 70%, #d98e82 94%);
    }
</style>
