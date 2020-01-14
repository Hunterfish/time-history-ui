<template>
    <fade-transition>
        <div class="alert alert-plus" :class="[`alert-${type}`, {'alert-dismissible': dismissible}]" role="alert">
            <slot>
              <span class="alert-inner--icon">
                  <slot name="index"></slot>
              </span>
              <span class="alert-inner--text over-text">
                  <slot name="text"></slot>
              </span>
            </slot>
            <slot name="dismiss-icon">
                <slot name="addCapsule"></slot>
                <slot name="eye"></slot>
            </slot>
        </div>
    </fade-transition>
</template>
<script>
import { FadeTransition } from "vue2-transitions";

export default {
  name: "my-base-nav",
  components: {
    FadeTransition
  },
  props: {
    type: {
      type: String,
      default: "default",
      description: "Alert type"
    },
    icon: {
      type: String,
      default: "",
      description: "Alert icon. Will be overwritten by default slot"
    },
    dismissible: {
      type: Boolean,
      default: false,
      description: "Whether alert is closes when clicking"
    }
  },
  data() {
    return {
    };
  },
  methods: {
    
    
  }
};
</script>
<style>
  .alert-plus {
    text-align: left;
    padding: 0rem 0rem!important;
    margin-bottom: 0.5rem;
  }
  
  .over-text {
        /* color: #19d3ea; */
        /* font-size: 18px; */
        text-align: left;
        width: 60%;   /*一定要设置宽度，或者元素内含的百分比*/
        overflow:hidden; /*溢出的部分隐藏*/
        white-space: nowrap; /*文本不换行*/
        text-overflow: ellipsis !important;/*ellipsis:文本溢出显示省略号（...）；clip：不显示省略标记（...），而是简单的裁切*/
    }
</style>
