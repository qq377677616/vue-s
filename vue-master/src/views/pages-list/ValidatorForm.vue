<template>
  <div class="body">
    <my-header :title="pageTitle"></my-header>
    <div class="full-screen flex-cen">
      <div class="flex-cen-col flex1">
        <input type="text" placeholder="请输入姓名" v-model="name">
        <input type="text" placeholder="请输入手机号" v-model="phone">
        <input type="password" placeholder="请输入密码" v-model="password">
        <input type="password" placeholder="请再次输入密码" v-model="repeatPassword">
        <input type="text" placeholder="请输入电子邮箱" v-model="email">
        <textarea name="address" placeholder="请输入收货地址" v-model="address"></textarea>
        <button @click="submit">提交</button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import MyHeader from "components/header.vue"
import { deleteObjectKey, verification } from 'assets/js/util'
import { required, sameAs, email, minLength, maxLength } from 'vuelidate/lib/validators'
import { name, phone, password } from "assets/js/vuelidate"
export default {
  name: "ValidatorForm",
  data() {
    return {
      pageTitle: "表单验证",//页面标题
      name: '',//姓名
      phone: '',//手机号
      email: '',//邮箱
      password: '',//密码
      repeatPassword: '',//再次输入密码
      address: '',//地址
      validation: {//表单验证配置
        name: { required, name, msg: { required: '姓名不能为空', name: '请输入2-4位中文姓名'} },//姓名
        phone: { required, phone, msg: { required: '手机号不能为空', phone: '手机号不符合规范' } },//手机号
        password: { required, password, msg: { required: '密码不能为空', password: '密码不符合规范（字母开头，6~18字母、数字或下划线）' } },//密码
        repeatPassword: { required, sameAsPassword: sameAs('password'), msg: { required: '确认密码不能为空', sameAsPassword: '两次输入密码不相同' } },//确认密码
        email: { required, email, msg: { required: '电子邮箱不能为空', email: '电子邮箱不符合规范' } },//电子邮箱
        address: { required, minLength: minLength(6), maxLength: maxLength(50), msg: { required: '收货地址不能为空', minLength: '收货地址不能少于6位字符', maxLength: '收货地址不能超过50位字符' } }//收货地址
      }
    }
  },
  methods: {
    //提交表单
    submit() {
      verification(this).then(res => {
        alert('表单验证通过')
        //**表单验证通过，这里写自己的业务逻辑
      }).catch(err => {
        this.$toast(err.msg)
      })
    },
  },
  //表单验证初化配置
  validations() {
    return deleteObjectKey(this.validation, 'msg', 1)
  },
  components: {
    MyHeader
  }
}
</script>

<style scoped>
  input,button,textarea{width:60%;height: .6rem;border:1px solid #ccc;margin:.1rem 0;box-sizing: border-box;}
  input,textarea{padding-left: .2rem;}
  textarea{padding:.2rem;height: 1.6rem;}
</style>