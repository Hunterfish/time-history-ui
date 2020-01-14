<template>
    <section class="section-hero section-shaped my-0">
        <div class="shape shape-style-1 shape-primary" style="back">
            <span class="span-150"></span>
            <span class="span-50"></span>
            <span class="span-50"></span>
            <span class="span-75"></span>
            <span class="span-100"></span>
            <span class="span-75"></span>
            <span class="span-50"></span>
            <span class="span-100"></span>
            <span class="span-50"></span>
            <span class="span-100"></span>
        </div>
        <div class="container shape-container align-items-center">
            <div class="col px-0">
                <div class="row justify-content-center align-items-center">
                    <div class="col-lg-12 text-center pt-lg">
                        <my-tabs-section></my-tabs-section>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import MyTabsSection from "./MyTabsSection";
export default {
    components: {
        MyTabsSection
    }
};
</script>
<style>
</style>
