<template>
    <div class="row justify-content-center">
        <!-- <div class="col-lg-6">
            <div class="mb-3">
                <small class="text-uppercase font-weight-bold">总榜</small>
            </div>
            <tabs fill class="flex-column flex-md-row" type="info">
                <card shadow slot-scope="{activeTabIndex}" style="background: #a98cc2">
                    <template v-for="(tab, index) in totalTabList">
                        <my-event-tab  ref="eventTab" @click="changeTab()"
                            :key="index" 
                            :tabKey="index"
                            :eventYear="queryYear"
                            :tabColor="tab.color" 
                            :tabTitle="tab.title" 
                            :eventType="tab.type">
                        </my-event-tab>
                    </template>
                </card>
            </tabs>
        </div> -->
        <div class="col-lg-6 mt-5 mt-lg-0">
            <!-- Menu -->
            <div class="mb-3">
                <small class="text-uppercase font-weight-bold">疯神榜</small>
                <el-date-picker
                    v-model="queryYear"
                    type="year"
                    size="mini"
                    value-format="yyyy"
                    @change="queryEventListByYear()"
                    style="width: 110px;"
                    placeholder="迄今为止">
                </el-date-picker>
                <base-button type="neutral" style="padding: 0.1rem 0.4rem;" @click="toGithub">
                    <img slot="icon" src="../../assets/my_img/github.svg">
                    Github
                </base-button>
            </div>
            <tabs fill class="flex-column flex-md-row">
                <card shadow style="background: #ae7ea9">
                    <template v-for="(tab, index) in recentlyTabList">
                        <my-event-tab  ref="eventTimeTab" @click="queryEventListByYear()"
                            :key="index" 
                            :tabKey="index"
                            :eventYear="queryYear"
                            :tabColor="tab.color" 
                            :tabTitle="tab.title" 
                            :eventType="tab.type">
                        </my-event-tab>
                    </template>
                </card>
            </tabs>
        </div>
        <my-event-url-modal :isVisible="isShowEventUrlModal" ref="eventUrlModal" @updateIsShowEventUrlModal="updateIsShowEventUrlModal"></my-event-url-modal>
        <base-alert type="danger" icon="ni ni-support-16" dismissible @update-isShow="updateIsShowDangerAlert" :isShow="isShowDangerAlert">
            <span slot="text"><strong>网络异常</strong>请稍后点击!</span>
        </base-alert>
        
    </div>
</template>
<script>

import Tabs from "@/components/Tabs/Tabs.vue";
import TabPane from "@/components/Tabs/TabPane.vue";
import BaseNav from "@/components/BaseNav";
import CloseButton from "@/components/CloseButton";
import MyEventUrlModal from "./MyEventUrlModal.vue";
import MyEventTab from "./MyEventTab";
import pill_box from '@/assets/my_img/pill_box.png';
import xi_gua from '@/assets/my_img/xigua.png';

export default {
  components: {
    Tabs,
    TabPane,
    MyEventUrlModal,
    //
    BaseNav,
    CloseButton,
    MyEventTab
  },

  data() {
    return {
        totalTabList: [
            // {title: "科技", type: 1, color: "purple"},
            // {title: "娱乐", type: 2, color: "purple"},
            // {title: "体育", type: 3, color: "purple"},
             {title: "科技", type: 1, color: ""},
            {title: "娱乐", type: 2, color: ""},
            {title: "体育", type: 3, color: ""},
        ],
        recentlyTabList: [
            {title: "科技", type: 1, color: ""},
            {title: "娱乐", type: 2, color: ""},
            {title: "体育", type: 3, color: ""},
        ],
        pill_box,
        xi_gua,
        isShowDangerAlert: false,
        isShowEventUrlModal: false,
        queryYear: ''
    };
  },
  created() {
  },
  methods: {

    updateIsShowDangerAlert(value) {
        this.isShowDangerAlert = value
    },

    updateIsShowEventUrlModal(value) {
        this.isShowEventUrlModal = value
    },

    changeTab() {
        this.$nextTick(() => {
          this.$refs['eventTab'].initData()
        })
    },

    changeTimeTab() {
        this.$nextTick(() => {
          this.$refs['eventTimeTab'].initData()
        })
    },

    toGithub() {
        window.open("https://gitee.com/ddebug/time-history-ui",'_blank')
    }
  },
};
</script>
<style>
</style>
