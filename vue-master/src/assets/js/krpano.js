const krpanoApi =  {
  /*krpano全景方法 */
  methods: {
    /**
     * 切换场景
     * @param { String } hotNameNum 场景名
     * @param { String } blend 场景切换动画
     */
    krpanoLoadscene(hotNameNum, blend) {
      this.krpanoPage.loadscene(hotNameNum, blend)
    },
    /**
     * 获取全景视频当前播放时间和总时间
     * @param { String } type 全景视频场景名
     * @returns 全景视频当前播放时间和总时间
     */
    getKrpanoVideoTime(type = 0) {
      return this.krpanoPage.getKrpanoVideoTime(type)
    },
    /**
     * 暂停播放全景视频
     * @param { String } type 全景视频场景名
     */
    playPauseVideo(type) {
      this.krpanoPage.playPauseVideo(type)
    },
    /**
     * 开启陀螺仪
     * @param { String } type 全景视频场景名
     */
    openGyro(type) {
      this.krpanoPage.openGyro(type)
    },
    /**
     * 添加热点
     * @param { String } type 全景视频场景名
     */
    krpanoAddHotspot(hotArr) {
      if (!hotArr.length) return
      for (let i = 0; i < hotArr.length; i++) {
        this.krpanoPage.AddHotspot(hotArr[i].hotName, hotArr[i].x, hotArr[i].y, hotArr[i].w, hotArr[i].h, hotArr[i].isDistorted, hotArr[i].imgSrc, hotArr[i].text)
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
    /**
     * 显示、隐藏热点
     * @param { Array } hotArr 热点数组
     * @param { Boolean } isShow 显示/隐藏
     */
    krpanoHideHotspot(hotArr, isShow) {
      for (let i = 0; i < hotArr.length; i++) {
        this.krpanoPage.ChangespotSet(hotArr[i].hotName, "visible", isShow)
      }
    },
    /**
     * 旋转到指定角度
     * @param { Number } deg 旋转角度
     * @param { Number } speed 旋转速度
     * @param { Number } direction 旋转方向
     */
    rotationAngle(deg, speed, direction) {
      this.krpanoPage.rotationAngle(deg, speed, direction)
    },
    /**
     * 设置缩放视角
     * @param { Number } fov 缩放视角
     */
    setFov(fov) {
      this.krpanoPage.setFov(fov)
    },
    /**
     * 设置水平、垂直视角
     * @param { Number } fov 角度
     * @param { Number } type 水平、垂直方向
     */
    setVlookatHlookat(fov, type) {
      this.krpanoPage.setVlookatHlookat(fov, type)
    },
    /**
     * 设置自动旋转
     * @param { Boolean } isOpen 打开/关闭
     */
    setAutorotate(isOpen = true) {
      this.krpanoPage.setAutoRotate(isOpen)
    }
  }
}
export {
  krpanoApi
}