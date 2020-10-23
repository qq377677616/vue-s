const krpanoApi =  {
  methods: {
    /**
     * ***krpano全景方法
     */
    //切换场景
    krpanoLoadscene(hotNameNum, blend) {
      this.krpanoPage.loadscene(hotNameNum, blend)
    },
    //开启陀螺仪
    openGyro(type) {
      this.krpanoPage.openGyro(type)
    },
    // 添加热点
    krpanoAddHotspot(hotArr) {
      if (!hotArr.length) return
      for (let i = 0; i < hotArr.length; i++) {
        this.krpanoPage.AddHotspot(hotArr[i].hotName, hotArr[i].x, hotArr[i].y, hotArr[i].w, hotArr[i].h, hotArr[i].imgSrc, hotArr[i].text)
        this.krpanoPage.ChangespotSet(hotArr[i].hotName, "visible", hotArr[i].isShow)
        if (hotArr[i].animation || hotArr[i].text) {
          if (hotArr[i].animation && hotArr[i].text) {
            this.krpanoPage.ChangespotSet(hotArr[i].hotName, "onloaded", `add_all_the_time_tooltip();do_crop_animation(${hotArr[i].animation})`)
          } else {
            if (hotArr[i].animation) this.krpanoPage.ChangespotSet(hotArr[i].hotName, "onloaded", `do_crop_animation(${hotArr[i].animation});`)
            if (hotArr[i].text) this.krpanoPage.ChangespotSet(hotArr[i].hotName, "onloaded", `add_all_the_time_tooltip();`)
          }
        }
        if (hotArr[i].click) this.krpanoPage.ChangespotSet(hotArr[i].hotName, "onclick", `js(${hotArr[i].click})`)
      }
    },
    //显示、隐藏热点
    krpanoHideHotspot(hotArr, isShow) {
      for (let i = 0; i < hotArr.length; i++) {
        this.krpanoPage.ChangespotSet(hotArr[i].hotName, "visible", isShow)
      }
    },
    //旋转到指定角度
    rotationAngle(deg, speed, direction) {
      this.krpanoPage.rotationAngle(deg, speed, direction)
    },
    //设置缩放视角
    setFov(fov) {
      this.krpanoPage.setFov(fov)
    },
    //设置水平、垂直视角
    setVlookatHlookat(fov, type) {
      this.krpanoPage.setVlookatHlookat(fov, type)
    }
  }
}
export {
  krpanoApi
}