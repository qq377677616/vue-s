<template>
  <div class="body">
    <my-header :title="pageTitle"></my-header>
    <div class="con-box">
      <dl class="item-list">
        <dd @click="openPicker(1)">{{carmodel}}</dd>
        <dd>日期</dd>
      </dl>
    </div>
    <!-- <van-popup v-model="show" position="bottom">
      <van-area :columns-num="4" :area-list="area_list" />
    </van-popup> -->
    <van-cell-group v-show="show">
      <!-- <van-cell v-model="carmodel" title="省/市/区" value="" @click="show = true"></van-cell> -->
      <van-popup v-model="show" position="bottom">
        <van-area
          ref="area"
          value="110000"
          :area-list="area_list"
          @change="onChange"
          @confirm="onConfirm"
          @cancel="show = false"
        />
      </van-popup>
  </van-cell-group>
  </div>
</template>

<script type="text/ecmascript-6">
import area_list from "assets/js/area"
import MyHeader from "components/header.vue"
console.log("area_list", area_list)
export default {
  name: "",
  data() {
    return {
      pageTitle: "picker选择",
      area_list: {},
      carmodel: '省市区',
      show: false
    }
  },
  mounted() {
    this.area_list = area_list
  },
  methods: {
    //打开picker组件
    openPicker() {
      this.show = !this.show
    },
    onChange(picker, value, index) {},
    onConfirm(value, index) {
      console.log(value, index)
      let areaName = ''
      for (var i = 0; i < value.length; i++) {
        areaName = areaName + value[i].name + ' '
      }
      this.carmodel = areaName
      this.openPicker()
    }
  },
  components: {
    MyHeader
  }
}
</script>

<style scoped>
  
</style>