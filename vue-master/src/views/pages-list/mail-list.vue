<template>
  <div class="singer" ref="singer">
    <My-Header :title="pageTitle"></My-Header> 
    <list-view @select="selectSinger" :data="singers" ref="list"></list-view>
    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
  import MyHeader from 'components/header.vue'
  import ListView from 'base/listview/listview'
  import singerList from 'assets/js/mail-list/singer-list.json'
  import Singer from 'assets/js/mail-list/singer'
  import { playlistMixin } from 'assets/js/mail-list/mixin'

  const HOT_SINGER_LEN = 10
  const HOT_NAME = '热门'

  export default {
    // mixins: [playlistMixin],
    data() {
      return {
        pageTitle: "A~Z索引滚动列表",
        singers: []
      }
    },
    created() {
      this._getSingerList()
      // console.log((singerList))
    },
    methods: {
      // handlePlaylist(playlist) {
      //   const bottom = playlist.length > 0 ? '60px' : ''
      //   this.$refs.singer.style.bottom = bottom
      //   this.$refs.list.refresh()
      // },
      selectSinger(singer) {
        this.$router.push({
          path: `/singer/${singer.id}`
        })
        // this.setSinger(singer)
      },
      _getSingerList() {
        // getSingerList().then((res) => {
        //   if (res.code === ERR_OK) {
        //     this.singers = this._normalizeSinger(res.data.list)
        //   }
        // }) 
        setTimeout(() => {
          this.singers = this._normalizeSinger(singerList)  
        }, 500)
      },
      _normalizeSinger(list) {
        let map = {
          hot: {
            title: HOT_NAME,
            items: []
          }
        }
        list.forEach((item, index) => {
          if (index < HOT_SINGER_LEN) {
            map.hot.items.push(new Singer({
              name: item.Fsinger_name,
              id: item.Fsinger_mid
            }))
          }
          const key = item.Findex
          if (!map[key]) {
            map[key] = {
              title: key,
              items: []
            }
          }
          map[key].items.push(new Singer({
            name: item.Fsinger_name,
            id: item.Fsinger_mid
          }))
        })
        // 为了得到有序列表，我们需要处理 map
        let ret = []
        let hot = []
        for (let key in map) {
          let val = map[key]
          if (val.title.match(/[a-zA-Z]/)) {
            ret.push(val)
          } else if (val.title === HOT_NAME) {
            hot.push(val)
          }
        }
        ret.sort((a, b) => {
          return a.title.charCodeAt(0) - b.title.charCodeAt(0)
        })
        return hot.concat(ret)
      }
      // ...mapMutations({
      //   setSinger: 'SET_SINGER'
      // })
    },
    components: {
      ListView,
      MyHeader
    }
  }

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .singer
    position: fixed
    top: .92rem
    bottom: 0
    width: 100% 
</style>
