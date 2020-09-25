<template>
  <div class="body">
    <my-header :title="pageTitle"></my-header>
    <div class="full-screen">
      <textarea v-model="textareaValue" @input="myInput"></textarea>  
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

import MyHeader from "components/header.vue"
export default {
  name: "",
  data() {
    return {
      pageTitle: "这是页面标题",
      textareaValue: ''
    }
  },
  components: {
    MyHeader
  },
  methods: {
    myInput() {
      console.log("textareaValue", this.textareaValue)
      console.log("textareaValue", this.textareaValue.indexOf('\n'))
    }
  }
}
</script>

<style scoped>
  textarea{width:300px;height:400px;border:1px solid red;}
</style>