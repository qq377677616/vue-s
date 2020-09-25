<template>
  <div class="vuex body flex-cen-col">
    <My-Header :title="pageTitle"></My-Header>
    <div class="avatarUrl"><img :src="userInfo.avatarUrl" alt=""></div>
    <div class="nickName">{{userInfo.nickName}}</div>
    <div class="nickName">{{userInfoNew.nickName}}</div>
    <div class="balance">￥{{calcBalance}}</div>
    <div class="button fle">
      <button @click="add({num: -100})">减</button>
      <button @click="asyncAdd({num: -100})">延迟减</button>
      <button @click="add({num: 20})">加</button>
    </div>
  </div>
</template> 

<script type="text/ecmascript-6">
import MyHeader from 'components/header.vue'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import { retainedDecimal } from 'assets/js/util.js'

export default {
  name: "",
  data() {
    return {
      pageTitle: "vuex"
    }
  },
  created() {

  },
  computed: {
    // ...mapState(["userInfo", "balance"]),
    ...mapState({
      userInfo: "userInfo",
      balance: "balance"
    }),
    ...mapGetters(["userInfoNew"]),
    calcBalance() {
      return retainedDecimal(this.balance > 0 ? this.balance : 0)
    }
  },
  methods: {
    ...mapMutations({
      add: "add"
    }),
    ...mapActions(["asyncAdd"]),
    aaa(a){
      return a * 50
    }
  },
  watch: {
    balance(newValue) {
      if (newValue <= 0) console.log("没钱啦")
    }
  },
  components: {
    MyHeader
  }
}
</script>

<style scoped>
  .vuex .avatarUrl img{border-radius: 50%;}
  .vuex .nickName{font-size: .4rem;margin:.3rem 0;}
  .vuex .balance{font-size: .5rem;margin-bottom: .3rem;}
  .vuex button{width:1.5rem;height:.8rem;margin:0 .2rem;border-radius: .1rem;font-size: .28rem;}
</style>