<template>
  <div class="lang">
    <van-action-sheet v-model="show" :actions="actions" cancel-text="取消" @select="onSelect" />
  </div>      
</template>

<script> 
export default {
  props: { 
  },
  data() {
    return {
      show: false,
      actions: [
        { name: '简体中文' },
        { name: '繁體中文' },
        { name: 'English'}
      ],
      langList: ['en', 'zh-CHS', 'zh-CHT']
    }
  },
  created() {

  },
  methods: {
    //打开语言选择窗口
    openLangList() {
      this.show = !this.show
    },
    //选择某个语言
    onSelect(e) {
      let _lang, _message
      if (e.name.includes("简体中文")) {
        _lang = 'zh-CHS'
        _message = ['语言切换中', '语言切换成功']
      } else if (e.name.includes("繁體中文")) {
        _lang = 'zh-CHT'
        _message = ['語言切換中', '語言切換成功']
      } else if (e.name.includes("English")) {
        _lang = 'en'
        _message = ['Language switching', 'Language switch successful']
      }
      this.openLangList()
      if (this.$i18n.locale == _lang) return false
      this.$toast.loading({ message: _message[0], loadingType: 'spinner' })
      setTimeout(() => {
        localStorage.setItem('i18nLocale', _lang)
        this.$i18n.locale = _lang
        this.$toast( _message[1])
      }, 1000)
    }
  }
} 
</script>

<style scoped>

</style>
