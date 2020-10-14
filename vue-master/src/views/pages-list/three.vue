<template>
  <div class="body">
    <my-header :title="pageTitle"></my-header>
    <div class="full-screen">
      <div id="canvas_div"></div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import MyHeader from "components/header.vue"
import * as THREE from 'three'
import Stats from 'three/examples/jsm/libs/stats.module.js'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// import { OBJLoader, MTLLoader } from 'three-obj-mtl-loader'
export default {
  name: "three",
  data() {
    return {
      pageTitle: "three.js",
      msg: 'This is webGL',
      renderer: null,
      camera: null,
      scene: null,
      light: null,
      stats: null,
      controls: null,
      canvasDiv: {
        element: null,
        wigth: '',
        height: ''
      },
      mesh: null,
      objChildren: [],
      mousePosition: {
        mouseX: 0,
        mouseY: 0
      },
      raycaster: null,
      mouse: null,
      selectObj: null,
      timer: null,
      animationRenId: null,
      animationAniId: null
    }
  },
  components: {
    MyHeader
  },
  mounted() {
    // this.init()

    this.initThree()
    this.initRenderer()
    this.initCamera()
    this.initScene()
    this.initModel()

    // this.initLight()
    // this.render()
  },
  methods: {
    init() {
      // 加载obj和mtl模型
      let _this = this;
      let mtlLoader = new MTLLoader();
      mtlLoader.load(`${_this.publicPath}model/place.mtl`, function(materials) {
          materials.preload();
          let objLoader = new OBJLoader();
          objLoader.load(`${_this.publicPath}model/place.obj`, function(obj) {
              obj.scale.x = obj.scale.y = obj.scale.z = 100;
              obj.rotation.y = 500;
              let mesh = obj;
              mesh.position.y = -50;
              _this.scene.add(mesh);
          })
        })
    },
    /* *
     * 初始化容器
     * */
    initThree() {
      let _el = document.getElementById('canvas_div')
      this.canvasDiv.element = _el
      this.canvasDiv.wigth = _el.clientWidth
      this.canvasDiv.height = _el.clientHeight
    },
    //渲染器
    initRenderer () {
      this.renderer = new THREE.WebGLRenderer()
      // this.renderer.setPixelRatio(window.devicePixelRatio) // 设置像素比
      this.renderer.setSize(this.canvasDiv.wigth, this.canvasDiv.height)
      this.renderer.setClearColor(0xffffff, 1.0)
      this.canvasDiv.element.appendChild(this.renderer.domElement)
    },
  /* *
     * 初始化相机
     * */
    initCamera () {

      this.camera = new THREE.PerspectiveCamera(75, this.canvasDiv.wigth / this.canvasDiv.height, 0.5, 1000)

      // 设置相机距离原点坐标的位置
      this.camera.position.x = 15
      this.camera.position.y = 15
      this.camera.position.z = 15

      // this.camera.up.x = 0
      // this.camera.up.y = 0
      // this.camera.up.z = 1
      // this.camera.lookAt({
      //   x: 0,
      //   y: 0,
      //   z: 0
      // })
    },
    /* *
     * 初始化场景
     * */
    initScene () {
      this.scene = new THREE.Scene()
    },
    /* *
     * 加载模型
     * */
    initModel () {
      // 辅助工具：一个轴对象，以一种简单的方式可视化三个轴。
      // X轴为红色。 Y轴为绿色。 Z轴为蓝色。
      // var helper = new THREE.AxesHelper(1000)
      // this.scene.add(helper)

      let that = this

      var objLoader = new OBJLoader()
      var mtlLoader = new MTLLoader()
      // mtlLoader.setPath('../../assets/three/')
      // 加载mtl文件
      // mtlLoader.load('http://img.vrupup.com/web/szq/images/three_mtl_01.mtl', function (material) {
      mtlLoader.load('/three/three_mtl_01.mtl', function (material) {
        console.log("【material】", material)
        // 预加载
        material.preload()
        // 设置当前加载的纹理
        objLoader.setMaterials(material)
        // objLoader.setPath('../../assets/three/')
        // objLoader.load('http://img.vrupup.com/web/szq/images/three_obj_01.obj', function (object) {
        objLoader.load('/three/three_obj_02.obj', function (object) {
          console.log("object", object)
          if (object.children) {
            var meshes = object.children
            meshes.forEach(element => {
              element.material.color.setHex('0x545454')
            })
            // 获取模型的某个部位
            var obj2 = object.children[2]
            console.log("【obj2】", obj2)
            // 设置模型某部位的样式
            obj2.material.color.setHex('0xff0000')
            obj2.material.opacity = 0.6
            obj2.material.transparent = true
            // obj2.material.depthTest = false
            that.objChildren.push(obj2)

            // 将模型缩放并添加到场景当中
            object.scale.set(1, 1, 1)
            that.scene.add(object)
          }
        }, that.onProgress, that.onError)
      })
    },
    /*
     * 模型加载进程
     */
    onProgress (xhr) {
      if (xhr.lengthComputable) {
        var percentComplete = xhr.loaded / xhr.total * 100
        console.log(Math.round(percentComplete, 2) + '% downloaded')
        if (Math.round(percentComplete, 2) == 100) {
          console.log('【开始渲染】')
          this.render()
          this.initLight()
          this.initControls()
        }
      }
    },
    //灯光
    initLight () {
      const ambientLight = new THREE.AmbientLight(0xCCCCCC, 0.4) // 环境光
      this.scene.add(ambientLight)

      this.light = new THREE.PointLight(0xffffff, 1) // 点光源
      this.light.position.set(50, 200, 100)
      // this.light.position.multiplyScalar(1.3) // 标量
      // this.light.castShadow = true // 告诉平行光需要开启阴影投射
      // this.light.shadow.mapSize.width = 500
      // this.light.shadow.mapSize.height = 500

      // var d = 300

      // this.light.shadow.camera.left = -d
      // this.light.shadow.camera.right = d
      // this.light.shadow.camera.top = d
      // this.light.shadow.camera.bottom = -d

      // this.light.shadow.camera.far = 1000

      this.scene.add(this.light)
    },
    /* *
     * 初始化性能检测插件
     * */
    initStats () {
      this.stats = new Stats()
      this.stats.dom.style.position = 'absolute'
      this.stats.dom.style.left = '0px'
      this.stats.dom.style.top = '0px'
      this.canvasDiv.element.appendChild(this.stats.dom)
    },
    /* *
     * 用户交互插件 鼠标左键按住旋转，右键按住平移，滚轮缩放
     * */
    initControls () {
      this.controls = new OrbitControls(this.camera, this.renderer.domElement) // , this.renderer.domElement

      // 如果使用animate方法时，将此函数删除
      // this.controls.addEventListener('change', this.render)
      // 使动画循环使用时阻尼或自转 意思是否有惯性
      this.controls.enableDamping = true
      // 动态阻尼系数 就是鼠标拖拽旋转灵敏度
      // controls.dampingFactor = 0.25;
      // 是否可以缩放
      this.controls.enableZoom = true
      // 是否自动旋转
      this.controls.autoRotate = false
      // 设置相机距离原点的最远距离
      this.controls.minDistance = 1
      // 设置相机距离原点的最远距离
      this.controls.maxDistance = 1000
      // 是否开启右键拖拽
      this.controls.enablePan = true
    },
    /* *
      * 渲染
     * */
    render () {
      this.renderer.clear()
      this.renderer.render(this.scene, this.camera)
      requestAnimationFrame(this.render)
    },
    /*
     * 鼠标跟随事件
     */
    onDocumentMouseMove (event) {
      event.preventDefault()

      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        // this.mousePosition.mouseX = (event.clientX - this.canvasDiv.wigth) / 2
        // this.mousePosition.mouseY = (event.clientY - this.canvasDiv.height) / 2
        // 光标的位置

        this.mouse = new THREE.Vector2()
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

        // 获取焦点
        var raycaster = new THREE.Raycaster()
        if (this.camera) {
          raycaster.setFromCamera(this.mouse, this.camera)
        }
        // console.log(this.scene.children[3])
        if (this.scene && this.scene.children && this.scene.children.length > 0) {
          var vPicker = this.scene.children[3] !== undefined ? this.scene.children[3]['children'] : []
          var intersects = raycaster.intersectObjects(vPicker)
          // console.log(this.scene.children[3])
          // console.log(this.scene.children[3]['children'])
          // console.log(intersects)
          if (intersects.length > 0) {
            var res = intersects.filter(function (res) {
              return res && res.object
            })[0]
            if (res && res.object) {
              this.selectObj = res.object
              // 暂存原有材质颜色
              // var _color = res.object.material.color.getHex()
              // this.selectObj.currentHex = parseInt('0x' + _color)
              // console.log(this.selectObj.currentHex)

              document.getElementsByTagName('body')[0].style.cursor = 'pointer' // 移到物体上时鼠标显示为手
              this.selectObj.material.color.setHex('0xffc466')
            }
          } else {
            // 鼠标移除时恢复材质颜色
            if (this.selectObj) this.selectObj.material.color.setHex('0xfafafa')
            document.getElementsByTagName('body')[0].style.cursor = 'default' // 移出物体时鼠标显示为默认
            // this.selectObj = null
          }
        }
      }, 200)
    }
  },
  beforeDestroy () {
    // 解绑事件、停止刷新
    window.removeEventListener('mousemove', this.onDocumentMouseMove, false)
    window.cancelAnimationFrame(this.animationRenId)
    window.cancelAnimationFrame(this.animationAniId)
    this.renderer.dispose()

    // 清理数据
    this.raycaster = null
    this.objChildren = []
    this.camera = null
    this.light = null
    this.scene = null
    this.renderer = null
  }
}
</script>

<style scoped>
  #canvas_div{width: 100vw;height: 100vh;background: green;}
</style>