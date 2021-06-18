import Vue from 'vue'
import api from "api/api"

const setPoint = data => {
  return new Promise(resolve => {
    api.setPoint(data).then(res => { resolve(res) })
  })
}

export default Vue => {
  Vue.prototype.$point = {
    setPoint
  }
}