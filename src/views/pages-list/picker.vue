<template>
  <div class="body">
    <my-header :title="pageTitle"></my-header>
    <div class="con-box">
      <dl class="item-list">
        <dd @click="openPicker(1)">{{value_area}}</dd>
        <dd @click="openPicker(2)">{{value_date}}</dd>
      </dl>
    </div>
    <!-- 省市区 -->
    <van-popup v-model="showAear" position="bottom">
      <van-area ref="area" value="110000" title="" :area-list="area_list" @change="onChangeArea" @confirm="onConfirmArea" @cancel="showAear = false" />
    </van-popup>
    <!-- 自定义日期 -->
    <van-popup v-model="showDate" position="bottom">
      <van-picker :columns="columns" :show-toolbar="true" title="" @change="onChangeDate" @confirm="onConfirmDate" @cancel="showDate = false" />
    </van-popup>
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
      area_list: { },
      value_area: '省市区',
      value_date: '时间段',
      showAear: false,
      showDate: false,
      columns: [
        {
          values: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
          className: 'column1',
          defaultIndex: 0
        },
        {
          values: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'],
          className: 'column2',
          defaultIndex: 0
        },
        {
          values: ['01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '24:00'],
          className: 'column3',
          defaultIndex: 0
        }
      ]
    }
  },
  mounted() {
    this.area_list = area_list
  },
  methods: {
    //打开picker组件
    openPicker(index) {
      if (index == 1) {
        this.showAear = !this.showAear
      } else if (index == 2) {
        this.showDate = !this.showDate
      }
    },
    //省市区picker--发生改变
    onChangeArea(picker, value, index) {},
    //时间picker组件--点击确定
    onConfirmArea(value, index) {
      console.log(value, index)
      let areaName = ''
      for (var i = 0; i < value.length; i++) {
        areaName = areaName + value[i].name + ' '
      }
      this.value_area = areaName
      this.openPicker(1)
    },
    //时间picker组件--发生改变
    onChangeDate(picker, value, index) {
      if (index != 1) return
      picker.setColumnValues(2, this.columns[2].values.slice(this.columns[1].values.findIndex(item => { return value[1] == item })))
    },
    //时间picker组件--点击确定
    onConfirmDate(value, index) {
      this.value_date = value.join("/")
      this.openPicker(2)
    }
  },
  components: {
    MyHeader
  }
}
</script>

<style scoped>
  
</style>