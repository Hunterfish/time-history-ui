<template>
    <div>
    <tab-pane :key="tabKey">
        <template slot="title">
            <i class="ni ni-air-baloon mr-2"></i>{{tabTitle}}
        </template>     
        <my-base-nav class="floating base-nav" type="" icon="ni ni-support-16" dismissible :isShow="flag" v-for="(event,index) in eventList"
              :key="index">
            <span slot="index">{{index + 1}}</span>
            <span slot="text">
              <el-tooltip :content="event.remark" placement="top-start" effect="light">
                <a style="color: white" class="navbar-brand" :href="event.url" target="_blank">
                      {{event.title}}
                </a>
              </el-tooltip>
            </span>
            <span slot="eye" class="capsule"  @click="addCapsule(event)">

              <vue-star-plus v-model="event.favourite" color="#ff0000" class="i-star__component" 
                              :animate="event.favourite ? 'animated swing' : ''">
                  <!-- <span slot="icon" class="i-star__text" 
                        :style="{color:(event.favourite?'rgb(240,86,84)':'#444'),'font-size':'20px'}"
                        @click="addCapsule(event)">
                    <i class="nav-link iconfont icon-capsule" style="font-size: 18px">{{event.likeCount}}</i>
                  </span> -->
                  <i slot="icon" class="nav-link iconfont icon-capsule" style="font-size: 18px">{{event.likeCount}}</i>
                </vue-star-plus>
            </span>
            <span  slot="addCapsule" class="eye" @click="showEventUrlModal(event)">
              <i class="nav-link iconfont icon-eye"></i>
            </span>
            <!-- 
            <span slot="eye" class="capsule" @click="addCapsule(event)">
              <i class="nav-link iconfont icon-capsule">{{event.likeCount}}</i>
            </span> -->
        </my-base-nav>
        <div class="text-center">
            <div class="row justify-content-center">
                <div class="col-lg-9">
                    <img :src="pill_box" class="img-fluid floating" @click="showEventModal">
                </div>
            </div>
        </div>
    </tab-pane>
    <my-event-url-modal :isVisible="isShowEventUrlModal" ref="eventUrlModal" @updateIsShowEventUrlModal="updateIsShowEventUrlModal"></my-event-url-modal>
    <my-event-modal :isEventVisible="isShowEventModal" ref="eventModal" @updateIsShowEventModal="updateIsShowEventModal"></my-event-modal>
    </div>
</template>
<script>
import MyBaseNav from "@/components/MyBaseNav.vue";
import pill from '@/assets/my_img/pill.png'
import TabPane from "@/components/Tabs/TabPane.vue";
import BaseNav from "@/components/BaseNav";
import MyEventUrlModal from "./MyEventUrlModal.vue";
import MyEventModal from "./MyEventModal.vue";
import pill_box from '@/assets/my_img/pill_box.png';

export default {
  components: {
    TabPane,
    BaseNav,
    MyEventUrlModal,
    MyEventModal,
    MyBaseNav
  },
  props: {
    tabKey: {
      type: Number,
      default: 1
    },
    eventYear: {
      type: String,
      default: "2022"
    },
    eventType: {
      type: Number,
      default: 1
    },
    tabTitle: {
      type: String,
      default: "科技"
    },
    tabColor: {
      type: String,
      default: "success"
    }
  },
  data() {
    return {
        eventList: [],
        pill_box,
        isShowEventUrlModal: false,
        isShowEventModal: false,
        flag: true
    };
  },
  created() {
      this.$nextTick(function() {
        this.initData()
      })
  },

  watch: {
    eventYear(newValue, oldValue) {
      console.log(newValue + "==" + oldValue)
        if (newValue != oldValue) {
            this.initData()
        }
    }
  },

  methods: {
    initData() {
        this.$http.post("/web/event/list", {type: this.eventType, queryYear: this.eventYear, isRank: 1}).then(response => {
            this.eventList = response.result
        })
    },

    // 点赞+1
    addCapsule(event) {
      this.$http.post("/web/event/addCapsule", {type: this.eventType, eventDate: event.dateStr, id: event.id, fingerPrintId: this.$fingerId}).then(resp => {
          event.likeCount = event.likeCount + 1
          setTimeout(() => {
              event.favourite=true;
          }, 100);
      })
    },

    showEventUrlModal(event) {
        this.isShowEventUrlModal = true
        this.$nextTick(() => {
          this.$refs['eventUrlModal'].initData(event.id)
        })
    },

    showEventModal() {
        this.isShowEventModal = true
        this.$nextTick(() => {
          this.$refs['eventModal'].initData(this.eventType, this.eventYear)
        })
    },

    updateIsShowEventUrlModal(value) {
        this.isShowEventUrlModal = value
    },

    updateIsShowEventModal(value) {
        this.isShowEventModal = value
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss">
/* .capsule {
    position: absolute;
    top: 0.3rem;
    right: 2rem;
    color: inherit;
  }
  .eye {
    position: absolute;
    top: 0.3rem;
    right: 0rem;
    color: inherit;
  } */
  .base-nav {
    -webkit-box-orient:vertical;
    text-align:center;
    
  }

  .base-nav span {
    -webkit-box-orient:vertical;
      margin:0 auto;
  }

  .capsule {
    .VueStar {
      position: initial!important;
      .VueStar__ground {
        /* width: 0px!important;
        height: 0px!important;
        display: inherit!important; */
        -webkit-box-orient:vertical;
        align-items: baseline;
        .VueStar__decoration {
            top: -30px;
        }
      }
    }
  }
</style>
