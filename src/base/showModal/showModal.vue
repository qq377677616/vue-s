<template>
  <div :class="['loading', showModal.isIcon ? 'icon' : '']" v-if="showModal.isShowModal">
    <div class="box">
      <img src="./loading.gif" v-if="showModal.isIcon">
      <p class="desc" v-if="showModal.title">{{showModal.title}}</p>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      showModal: {
        type: Object,
        default: {
          isIcon: true,
          isShowModal: false,
          title: '上传中'
        }
      }
    }
  }
</script>
<style scoped>
  .loading{position: fixed;display: flex;align-items: center;flex-direction: column;justify-content: center;width: 100%;height: 100%;left:0;top:0;z-index: 99999;text-align: center;}
  .loading img{width: 0.48rem;}
  .loading .box{background: rgba(0,0,0,.7);width: auto;padding: .2rem;border-radius: .1rem;}
  .loading.icon .box{width: 1.3rem; height: 1.3rem; display: flex; align-items: center; justify-content: center; flex-direction: column;}
  .loading .desc{line-height: 1.2;font-size: .24rem;color: #fff;min-width: 1rem;max-width: 3rem;}  
  .loading .desc.title{width: .6rem;}
  .loading.icon p {padding-top: .1rem;}     
</style>
