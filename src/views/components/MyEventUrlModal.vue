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
                            <ul class="list-unstyled mt-5">
                                 <!-- <li class="py-2"> -->
                                    <el-timeline>
                                        <el-timeline-item v-for="(item,index) in eventUrlList" :key="index" :timestamp="item.dateStr" :color="item.type | typeFilter" placement="bottom">
                                            <div class="d-flex align-items-center" v-if="item.type === 1">
                                                <badge type="default" pill  class="mr-3">声明</badge>
                                                <el-tooltip :content="item.remark" placement="top-end" effect="light">
                                                    <a class="mb-0 text-default url-over-text" :href="item.url" target="_blank">{{item.title}}<i class="iconfont icon-capsule"></i></a>
                                                </el-tooltip>
                                            </div>
                                            <div class="d-flex align-items-center" v-else-if="item.type === 2">
                                                <badge type="danger" pill class="mr-3">道歉</badge>
                                                <el-tooltip :content="item.remark" placement="top-end" effect="light">
                                                    <a class="mb-0 text-danger url-over-text" :href="item.url" target="_blank">{{item.title}}<i class="iconfont icon-capsule"></i></a>
                                                </el-tooltip>
                                            </div>
                                            <div class="d-flex align-items-center" v-else>
                                                <badge type="success" pill class="mr-3">举措</badge>
                                                <el-tooltip :content="item.remark" placement="top-end" effect="light">
                                                    <a class="mb-0 text-success url-over-text" :href="item.url" target="_blank">{{item.title}}<i class="iconfont icon-capsule"></i></a>
                                                </el-tooltip>
                                            </div>
                                        </el-timeline-item>
                                    </el-timeline>
                                <!-- </li> -->
                                <!-- <li class="py-2" :key="index" v-for="(item,index) in eventUrlList">
                                    <div class="d-flex align-items-center" v-if="item.type === 1">
                                        <badge type="default" pill  class="mr-3">声明</badge>
                                        <el-tooltip :content="item.remark" placement="top-end" effect="light">
                                            <a class="mb-0 text-default" :href="item.url" target="_blank">{{item.title}}<i class="iconfont icon-capsule"></i>{{item.remark}}</a>
                                        </el-tooltip>
                                    </div>
                                    <div class="d-flex align-items-center" v-else-if="item.type === 2">
                                        <badge type="danger" pill class="mr-3">道歉</badge>
                                        <el-tooltip :content="item.remark" placement="top-end" effect="light">
                                            <a class="mb-0 text-danger" :href="item.url" target="_blank">{{item.title}}<i class="iconfont icon-capsule"></i>{{item.remark}}</a>
                                        </el-tooltip>
                                    </div>
                                    <div class="d-flex align-items-center" v-else>
                                        <badge type="success" pill class="mr-3">举措</badge>
                                        <el-tooltip :content="item.remark" placement="top-end" effect="light">
                                            <a class="mb-0 text-success" :href="item.url" target="_blank">{{item.title}}<i class="iconfont icon-capsule"></i>{{item.remark}}</a>
                                        </el-tooltip>
                                    </div>
                                </li> -->
                            </ul>
                        </div>
                    </div>
                </div>
                <template slot="footer">
                    <!-- <base-button type="primary">Save changes</base-button> -->
                    <base-button type="link" class="ml-auto" @click="closeModal">关闭
                    </base-button>
                </template>
            </modal>
        </div>
    </div>
</template>
<script>
import Modal from "@/components/Modal.vue";
import pill from '@/assets/my_img/pill.png'
export default {
  components: {
    Modal
  },
  props: {
    isVisible: {
      type: Boolean,
      default: false
    },
    eventId: {
      type: Number,
      default: undefined 
    }
  },
  data() {
    return {
        pill,
        visible: this.isVisible,
        eventUrlList: [
        ]
    };
  },
  filters: {
        // 类型颜色转换
        typeFilter(type) {
        const typeMap = {
            1: 'rgba(52,98,175,0.5)',
            2: 'rgba(251,175,190,0.5)',
            3: 'rgba(147,231,195,0.5)',
        }
        return typeMap[type]
    }
  },
  watch: {
    isVisible(newValue, oldValue) {
        if (newValue) {
            this.visible = this.isVisible
        }
    },
    visible(newValue, oldValue) {
        if (!newValue) {
            this.closeModal()
        }
    }
  },
  methods: {
        // 初始化数据
        initData(eventId) {
            this.$http.get(`/web/event/eventUrlList/${eventId}`).then(response => {
              this.eventUrlList = response.result
            })
        },
        closeModal() {
            this.visible = false;
            this.$emit('updateIsShowEventUrlModal', false)
        }
  }
};
</script>
<style>
    .url-over-text {
        /* color: #19d3ea; */
        /* font-size: 18px; */
        text-align: left;
        width: 100%;   /*一定要设置宽度，或者元素内含的百分比*/
        overflow:hidden; /*溢出的部分隐藏*/
        white-space: nowrap; /*文本不换行*/
        text-overflow:ellipsis;/*ellipsis:文本溢出显示省略号（...）；clip：不显示省略标记（...），而是简单的裁切*/
    }
</style>
