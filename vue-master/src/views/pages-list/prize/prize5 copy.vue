<template>
  <div class="game-box">
    <div class="game-box">
       
      <div class="frulit-box">
         
        <div
          class="slot"
          v-for="(slot, index) in slots"
          ref="slots"
          :key="index"
        >
          <img
            class="slot__item"
            v-for="(opt, subindex) in slot.items"
            :key="opt + subindex"
            :src="opt"
          />
        </div>
      </div>

      <div class="start-btn" @click="start"></div>
    </div>
  </div>
</template>

 

<script>
const next =
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  function (cb) {
    window.setTimeout(cb, 10000 / 60);
  };

export default {
  data() {
    return {
      slots: [
        {
          title: "When",

          items: [
            'https://img.vrupup.com/web/szq/images/prize_01.jpg',
            'https://img.vrupup.com/web/szq/images/prize_01.jpg',
            'https://img.vrupup.com/web/szq/images/prize_01.jpg',
            'https://img.vrupup.com/web/szq/images/prize_01.jpg',
            'https://img.vrupup.com/web/szq/images/prize_01.jpg',
            'https://img.vrupup.com/web/szq/images/prize_01.jpg'
          ],
        },

        {
          title: "Where",

          items: [
            'https://img.vrupup.com/web/szq/images/prize_02.jpg',

            'https://img.vrupup.com/web/szq/images/prize_02.jpg',

            'https://img.vrupup.com/web/szq/images/prize_02.jpg',

            'https://img.vrupup.com/web/szq/images/prize_02.jpg',

            'https://img.vrupup.com/web/szq/images/prize_02.jpg',

            'https://img.vrupup.com/web/szq/images/prize_02.jpg',

            'https://img.vrupup.com/web/szq/images/prize_02.jpg',

            'https://img.vrupup.com/web/szq/images/prize_02.jpg',

            'https://img.vrupup.com/web/szq/images/prize_02.jpg',

            'https://img.vrupup.com/web/szq/images/prize_02.jpg'
          ],
        },

        {
          title: "How",

          items: [
            'https://img.vrupup.com/web/szq/images/prize_03.jpg',

            'https://img.vrupup.com/web/szq/images/prize_03.jpg',

            'https://img.vrupup.com/web/szq/images/prize_03.jpg',

            'https://img.vrupup.com/web/szq/images/prize_03.jpg',

            'https://img.vrupup.com/web/szq/images/prize_03.jpg',
          ],
        },
      ],

      opts: null,

      startedAt: null,

      fontSize: null,
    };
  },

  mounted() {
    this.$nextTick(() => {
      this.fontSize = this.getFont();
    });
  },

  methods: {
    start() {
      if (this.opts) {
        return;
      }

      let height = this.fontSize * 6;

      this.opts = this.slots.map((data, i) => {
        const slot = this.$refs.slots[i]; // 读取每一列
        const choice = Math.floor(Math.random() * data.items.length); // 获取每一列的长度
        const opts = {
          el: slot, //指向奖项元素的父级来控制控制滚动速度;
          finalPos: choice * height, // height 为每一个奖品滚动标签的高度;
          startOffset: 720 + Math.random() * 500 + i * 500, // 影响转的圈数
          height: data.items.length * height,

          duration: 3000 + i * 700, // 动画时常
          isFinished: false, // 是否已经停止了
        };

        return opts;+
      });

      next(this.animate); // 启动动画
    },

    animate: function (timestamp) {
      // timestamp当前的方法持续的毫秒数

      if (this.startedAt == null) {
        this.startedAt = timestamp; // 动画初始时间
      }

      const timeDiff = timestamp - this.startedAt; //动画持续的时间
      this.opts.forEach((opt) => {
        if (opt.isFinished) {
          return;
        }

        const timeRemaining = Math.max(opt.duration - timeDiff, 0); // 总的持续时间 - 动画持续时间 = 剩下的时间,0表示结束
        const power = 3;

        const offset =
          (Math.pow(timeRemaining, power) / Math.pow(opt.duration, power)) *
          opt.startOffset;

        const pos = -1 * Math.floor((offset + opt.finalPos) % opt.height);

        opt.el.style.transform = "translateY(" + pos + "px)";

        if (timeDiff > opt.duration) {
          opt.isFinished = true;
        }
      });

      if (this.opts.every((o) => o.isFinished)) {
        // 判断时候所有的isFinished都是true

        this.opts = null;

        this.startedAt = null;
      } else {
        next(this.animate);
      }
    },

    getFont() {
      var ration = 2;

      var params = {
        defaultFontSize: 20,

        designWidth: 750,
      };

      var clientWidth = document.documentElement.clientWidth,
        ration = clientWidth / params.designWidth;

      return ration * params.defaultFontSize;
    },
  },
};
</script>

 

<style scoped>
.game-box {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  /* background: url("../../static/imgs/frulit/bg.jpg")  no-repeat; */
  background-size: 100% 100%;
}
.game-box .game-box {
  width: 30rem;
  height: 26.88rem;
  /* background: url("../../static/imgs/frulit/2.png")  no-repeat; */
  background-size: 100% 100%;
  margin: 18rem auto 0 auto;
  position: relative;
}
.game-box .game-box .start-btn  {
  width: 12rem;
  height: 7rem;
  border-radius: 50%;
  position: absolute;
  bottom: 4rem;
}
.game-box .game-box .frulit-box  {
  width: 22rem;
  height: 6rem;
  position: absolute;
  top: 4.8rem;
  left: 3.92rem;
  display: flex;
  overflow: hidden;
}
.game-box .game-box .slot  {
  width: 7.3rem;
  height: 6rem;
  margin-right: 0.2rem;
}
.game-box .game-box .slot:nth-child(3)  {
  margin-right: 0;
}
.game-box .game-box .slot__item  {
  width: 100%;
  height: 100%;
  display: block;
}
</style>