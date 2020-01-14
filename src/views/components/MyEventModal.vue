<template>
    <!-- Modals -->
    <div class="row">
        <div class="col-md-4">
            <modal :show.sync="visible">
                <div class="row row-grid align-items-center">
                    <div class="col-md-2 order-md-2">
                        <img :src="pill" class="img-fluid floating">
                    </div>
                    <div class="col-md-12 order-md-2">
                        <div class="pr-md-5">
                            <h3>病历表</h3>
                            <!-- <p>给岁月以文明,不给文明以岁月.</p> -->
                            <p>鱼的记忆只有7秒，我们也是</p>
                            <my-base-nav class="floating" type="" icon="ni ni-support-16" dismissible :isShow="flag" v-for="(event,index) in eventList"
                                :key="index">
                                <span slot="index" style="color:teal">{{index + 1}}</span>
                                <span slot="text">
                                    <el-tooltip :content="event.remark" placement="top-end" effect="light">
                                        <a style="color: teal" class="navbar-brand" :href="event.url" target="_blank">
                                            {{event.title}}
                                        </a>
                                    </el-tooltip>
                                </span>
                                <span  slot="addCapsule" class="eye" @click="showEventUrlModal(event)">
                                <i class="nav-link iconfont icon-eye"></i>
                                </span>
                                <span slot="eye" class="capsule" @click="addCapsule(event)">
                                <i class="nav-link iconfont icon-capsule">{{event.likeCount}}</i>
                                </span>
                            </my-base-nav>
                        </div>
                    </div>
                </div>
                <template slot="footer">
                    <base-button type="link" class="ml-auto" @click="closeModal">关闭
                    </base-button>
                </template>
            </modal>
        </div>
        <my-event-url-modal :isVisible="isShowEventUrlModal" ref="eventUrlModal" @updateIsShowEventUrlModal="updateIsShowEventUrlModal"></my-event-url-modal>
    </div>
</template>
<script>
import MyBaseNav from "@/components/MyBaseNav.vue";
import Modal from "@/components/Modal.vue";
import BaseNav from "@/components/BaseNav";
import MyEventUrlModal from "./MyEventUrlModal.vue";
import pill from '@/assets/my_img/pill.png'
export default {
  components: {
    Modal,
    BaseNav,
    MyEventUrlModal,
    MyBaseNav
  },
  props: {
    isEventVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
        pill,
        visible: this.isEventVisible,
        eventList: [],
        isShowEventUrlModal: false,
        type: 1,
        flag: true,
        eventYear: ''
    };
  },
   watch: {
    isEventVisible(newValue, oldValue) {
        if (newValue) {
            this.visible = this.isEventVisible
        }
    },
    visible(newValue, oldValue) {
        if (!newValue) {
            this.closeModal()
        }
    }
  },
  created() {
    this.initData(this.type, this.eventYear)
  },
  methods: {
        // 初始化数据
        initData(eventType, eventYear) {
            this.type = eventType
            this.eventYear = eventYear
            this.$http.post("/web/event/list", {type: eventType, queryYear: eventYear, isRank: 0}).then(response => {
                this.eventList = response.result
            })
        },
        // 点赞+1
        addCapsule(event) {
            this.$http.post("/web/event/addCapsule", {type: this.type, eventDate: event.dateStr, id: event.id, fingerPrintId: this.$fingerId})
            .then(resp => {
                event.likeCount = event.likeCount + 1
                //  else if (resp.code === 1001) {
                //     this.$message({
                //     showClose: true,
                //     type: 'error',
                //     message: resp.msg
                //     });
                // } else {
                //     this.$message({
                //     showClose: true,
                //     type: 'error',
                //     message: '网络异常，正在补充胶囊~'
                //     });
                // }
                
            })
        },

        showEventUrlModal(event) {
            this.isShowEventUrlModal = true
            this.$nextTick(() => {
            this.$refs['eventUrlModal'].initData(event.id)
            })
        },

        updateIsShowEventUrlModal(value) {
            this.isShowEventUrlModal = value
        },

        showEventUrlModal(event) {
            this.isShowEventUrlModal = true
            this.$nextTick(() => {
            this.$refs['eventUrlModal'].initData(event.id)
            })
        },

        closeModal() {
            this.visible = false;
            this.$emit('updateIsShowEventModal', false)
        }
  }
};
</script>
<style>
 .capsule {
    position: absolute;
    /* top: 0.3rem; */
    right: 2rem;
    color: teal;
  }
  .eye {
    position: absolute;
    /* top: 0.3rem; */
    right: 0rem;
    color: teal;
  }
</style>
